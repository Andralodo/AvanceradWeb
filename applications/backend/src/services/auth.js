import db from "../db.js";
import jwt from 'jsonwebtoken'
import {
    JWT_EXPIRATION_TIME,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ID_TOKEN_SECRET
  } from "../config.js";

const DATABASE_ERROR_MESSAGE ="Internal Server Error"

export async function generateAccessAndIdTokens(account) {

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
      return res.status(401).json({ errors: ['No access token provided'] });
    }

    try {
      // Check if the token has been revoked
      const [results] = await db.query('SELECT token FROM revoked_tokens WHERE token = ?', [token]);
  
      if (results.length > 0) {
        return res.status(403).json({ errors: ['Access token has been revoked'] });
      }
  
      jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ errors: ['Invalid access token'] });
        }
  
        req.userId = user.sub;
        next();
      });
    } 
    catch (error) {
      return res.status(500).json({ errors: [DATABASE_ERROR_MESSAGE] });
    }
  }

// Middleware to decode ID token from the request header
export const decodeIdToken = async (req, res, next) => {
  const idToken = req.cookies.idToken;

  if (!idToken) {
    return res.status(401).json({ errors: ['No ID token provided'] });
  }

  try{

    // Check if the token has been revoked
    const [results] = await db.query('SELECT token FROM revoked_tokens WHERE token = ?', [idToken]);

    if (results.length > 0) {
      return res.status(403).json({ errors: ['Id token has been revoked'] });
    }

    jwt.verify(idToken, JWT_ID_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ errors: ['Invalid ID token'] });
      }
  
      // If the ID token is valid, add the decoded data to the request object
      req.idToken = decoded;
  
      next();
    });
  }
  catch (error) {
    return res.status(500).json({ errors: [DATABASE_ERROR_MESSAGE] });
  }
};

export async function revokeToken(token){
    try{
      const query = "INSERT INTO revoked_tokens (token) VALUES (?)"
  
      const [results] = await db.query(query, [token])
  
      return results
    }
    catch(error){
      return res.status(500).json({ errors: [DATABASE_ERROR_MESSAGE] });
    }
  }
