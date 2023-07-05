import db from "../db.js";

const DATABASE_ERROR_MESSAGE ="Internal Server Error"

function validateAccount(accountData){
  const minUsernameLength = 3
  const maxUsernameLength = 20

  const minPasswordLength = 5
  const maxPasswordLength = 100


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

export const getAllAccount = async (req, res) => {
  
  try{
    const query = "SELECT accountId, username FROM accounts"
  
    const [post] = await db.query(query)
  
    res.status(200).send(post);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const getAccount = async (req, res) => {
  
  try{
    const query = "SELECT * FROM accounts WHERE accountId = ?"
    const postId = req.params.id
  
    const [post] = await db.query(query, [postId])
  
    res.status(200).send(post);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const createAccount = async (req, res) => {
  const accountData = req.body;

  console.log(accountData)

  const errorMessages = validateAccount(accountData)

  console.log(errorMessages)

  if(errorMessages.length > 0){
      res.status(400).send(errorMessages)
      return;
  }

  try{
    const query = "INSERT INTO accounts (username, password) VALUES (?, ?)"
    const values = [accountData.username, accountData.password]

    const [account] = await db.query(query, values)

    console.log(account)

    res.status(200).json(account);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const updateAccount = async (req, res) => {
  const accountData = req.body;

  const errorMessages = validateAccount(accountData)

  if(errorMessages.length > 0){
      res.status(400).send(json(errorMessages))
      return;
  }
  
  try{
    const query = "UPDATE accounts SET username = ?, password = ? WHERE accountId = ?"
    const values = [accountData.username, accountData.password, accountData.accountId]
  
    const account = await db.query(query, values)
  
    res.status(200).json(account);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const deleteAccount = async (req, res) => {
  const accountId = req.params.id

  try{
    const query = "DELETE FROM accounts WHERE accountId = ?"

    const account = await db.query(query, [accountId])
  
    res.json(account);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};