import bcrypt from 'bcrypt';
import db from "../db.js";
import { 
  generateAccessAndIdTokens, 
  revokeToken
} from "../services/auth.js";

const DATABASE_ERROR_MESSAGE ="Internal Server Error"

function validateAccount(accountData){
  const minUsernameLength = 3
  const maxUsernameLength = 15

  const minPasswordLength = 5
  const maxPasswordLength = 20


  const validationErrors = []
  if(accountData.username){
      if (accountData.username.length < minUsernameLength) {
          validationErrors.push("The username needs to be at least " + minUsernameLength + " characters.")
      }
  
      if (accountData.username.length > maxUsernameLength) {
          validationErrors.push("The username cant contain more than " + maxUsernameLength + " characters.")
      }
  }
  else{
      validationErrors.push("Username cannot be empty")
  }

  if(accountData.password){
    if (accountData.password.length < minPasswordLength) {
        validationErrors.push("The password needs to be at least " + minPasswordLength + " characters.")
    }

    if (accountData.password.length > maxPasswordLength) {
        validationErrors.push("The password cant contain more than " + maxPasswordLength + " characters.")
    }
  }
  else{
    validationErrors.push("Password cannot be empty")
  }
  return validationErrors
}

const findAccountByUsername = async (res, username) => {
  // function to find a user by their username in the database
  try{
    const query = "SELECT * FROM accounts WHERE username = ?"

    const [account] = await db.query(query, [username])

    return account
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});;
  }
};

const createAccount = async (res, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
    const query = "INSERT INTO accounts (username, password) VALUES (?, ?)"
    const values = [username, hashedPassword]

    const [accountResult] = await db.query(query, values)

    let account = {
      accountId: accountResult.insertId,
      username: username
    }

    return account
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const fetchCurrentUser = async (req, res) => {
  const accountId = req.idToken.sub
  
  //Check if the user is authorized to fetch this data
  if(req.userId != accountId){
    return res.status(401).json({ message: 'Wrong user' });
  }

  try{
    const query = "SELECT * FROM accounts WHERE accountId = ?"
  
    const [account] = await db.query(query, [accountId])

    console.log("account: ", account[0])
  
    res.status(200).json({userId: account[0].accountId, username: account[0].username});
  }
  catch(error){
    res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const getAccountById = async (req, res) => {
  const accountId = req.params.id
  
  //Check if the user is updating his account
  if(req.userId != accountId){
    return res.status(401).json({ message: 'Wrong user' });
  }

  try{
    const query = "SELECT * FROM accounts WHERE accountId = ?"
  
    const [account] = await db.query(query, [accountId])
  
    res.status(200).json({accountId: account[0].accountId, username: account[0].username});
  }
  catch(error){
    res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const register = async (req, res) => {
  const accountData = req.body;

  const validationErrors = validateAccount(accountData)

  if(validationErrors.length > 0){
      return res.status(400).json({errors: validationErrors})
  }

  let existingUser = await findAccountByUsername(res, accountData.username)

  if (existingUser.length != 0 && existingUser[0].username == accountData.username) {
    return res.status(409).json({errors: ['Username already exists']});
  }

  let newAccount = await createAccount(res, accountData.username, accountData.password)

  res.status(201).json({success: "Succesfully registered."})
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  // Check if the user exists
  const account = await findAccountByUsername(res, username);

  if(account.length == 0 || await bcrypt.compare(account[0].password, password)) {
    return res.status(401).json({errors: ['Invalid username or password']});
  }

  const {accessToken, idToken} = await generateAccessAndIdTokens(account[0])

  res.cookie('accessToken', accessToken, {
    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    secure: false, // Send the cookie only over HTTPS
    sameSite: 'lax', // Restrict cookie to same-site requests
  })

  res.cookie('idToken', idToken, {
    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    secure: false, // Send the cookie only over HTTPS
    sameSite: 'lax', // Restrict cookie to same-site requests
  })
  
  res.status(200).json({message: "Succesfully loged in."})
};

export const logout = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const idToken = req.cookies.idToken;

  // Perform token revocation here, invalidate the user's access token
  await revokeToken(accessToken)
  // Clear the accessToken cookie on the frontend
  res.clearCookie('accessToken');

  // Perform token revocation here, invalidate the user's id token
  await revokeToken(idToken)
  // Clear the idToken cookie on the frontend
  res.clearCookie('idToken');

  // Send a response indicating successful logout
  res.status(200).json({ message: 'Succesfully loged out.' });
};

export const updateAccount = async (req, res) => {
  const accountId = req.params.id
  const accountData = req.body;

  //Check if the user is updating his account
  if(req.userId != accountId){
    return res.status(401).json({ message: 'Wrong user' });
  }

  const validationErrors = validateAccount(accountData)

  if(validationErrors.length > 0){
      return res.status(400).send({errors: validationErrors})
  }

  let existingUser = await findAccountByUsername(res, accountData.username)

  //Check if username is in use already
  if (existingUser.length != 0 && existingUser[0].username == accountData.username) {
    //check if the username is used by another account.
    if(existingUser[0].accountId != accountId){
      return res.status(409).json({errors: ['Username is in use']});
    }
  }
  
  try{
    const hashedPassword = await bcrypt.hash(accountData.password, 10);

    const query = "UPDATE accounts SET username = ?, password = ? WHERE accountId = ?"
    const values = [accountData.username, hashedPassword, accountId]
  
    const account = await db.query(query, values)
  
    res.status(200).json(account);
  }
  catch(error){
    res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const deleteAccount = async (req, res) => {
  const accountId = req.params.id
  const accessToken = req.cookies.accessToken;
  const idToken = req.cookies.idToken;

  //Check if the user is removing his account
  if(req.userId != accountId){
    return res.status(401).json({ message: 'Wrong user' });
  }

  // Perform token revocation here, invalidate the user's access token
  await revokeToken(accessToken)
  // Clear the accessToken cookie on the frontend
  res.clearCookie('accessToken');

  // Perform token revocation here, invalidate the user's id token
  await revokeToken(idToken)
  // Clear the idToken cookie on the frontend
  res.clearCookie('idToken');
    
  try{
      //1. delete all comments by user.
      const queryDeleteComments = "DELETE FROM comments WHERE accountId = ?"
      await db.query(queryDeleteComments, [accountId])

      //2. Select all postIds by user.
      const querySelectPosts = "SELECT postId FROM posts WHERE accountId = ?"
      const [postIds] = await db.query(querySelectPosts, [accountId])

      const postIdValues = postIds.map(item => item.postId);

      //Check that postIdValues is not 0.
      if(postIdValues.length > 0){
        //3.  delete all comments on post by user.
        const queryDeleteAllCommentsFromPosts = `DELETE FROM comments WHERE postId IN (?);`;
        await db.query(queryDeleteAllCommentsFromPosts, [postIdValues])
      }

      //4.  delete all posts by user
      const queryDeletePosts = "DELETE FROM posts WHERE accountId = ?"
      await db.query(queryDeletePosts, [accountId])
      
      //5.  delete user account.
      const query = "DELETE FROM accounts WHERE accountId = ?"
      await db.query(query, [accountId])
  
      return res.json({message: "Succesfully deleted account."});
  }
  catch(error){
      console.error('Error revoking token:', error);
      return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};