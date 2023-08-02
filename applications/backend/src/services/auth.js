import db from "../db.js";
import jwt from 'jsonwebtoken'
import {
    JWT_EXPIRATION_TIME,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ID_TOKEN_SECRET
  } from "../config.js";

export async function generateAccessAndIdTokens(account) {

  console.log("AccountID", account.accountId)
    const accessToken = jwt.sign(
      { 
        sub: account.accountId, 
        timestamp: Date.now() + 1000 
      }, 
      JWT_ACCESS_TOKEN_SECRET, 
      { expiresIn: JWT_EXPIRATION_TIME }
    );

    const idToken = jwt.sign(
      { 
        sub: account.accountId, 
        timestamp: Date.now() + 1000,
        username: account.username 
      }, 
      JWT_ID_TOKEN_SECRET, 
      { expiresIn: JWT_EXPIRATION_TIME }
    );
    return {accessToken, idToken}
}

export async function verifyAccessToken(req, res, next) {
    const token = req.cookies.accessToken;
  
    if (!token) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    try {
      // Check if the token has been revoked
      const [results] = await db.query('SELECT token FROM revoked_tokens WHERE token = ?', [token]);
  
      if (results.length > 0) {
        return res.status(403).json({ message: 'Access token has been revoked' });
      }
  
      jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid access token' });
        }
  
        req.userId = user.sub;
        console.log("User: ", user)
        next();
      });
    } catch (error) {
      console.error('Error checking revoked token:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

// Middleware to decode ID token from the request header
export const decodeIdToken = async (req, res, next) => {
  const idToken = req.cookies.idToken;

  if (!idToken) {
    return res.status(401).json({ message: 'No ID token provided' });
  }

  jwt.verify(idToken, JWT_ID_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid ID token' });
    }

    // If the ID token is valid, add the decoded data to the request object
    req.idToken = decoded;

    next();
  });
};

export async function revokeToken(token){
    try{
      const query = "INSERT INTO revoked_tokens (token) VALUES (?)"
  
      const [results] = await db.query(query, [token])
  
      return results
    }
    catch(error){
      console.error('Error revoking token:', error);
      return "Internal server error";
    }
  }