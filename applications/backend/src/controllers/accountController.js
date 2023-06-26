import db from "../db.js";

const DATABASE_ERROR_MESSAGE ="Internal Server Error"

function validatePost(accountData){
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

  const errorMessages = validatePost(accountData)

  console.log(errorMessages)

  if(errorMessages.length > 0){
      res.status(400).send(errorMessages)
      return;
  }

  try{
    const query = "INSERT INTO posts (username, password) VALUES (?, ?)"
    const values = [accountData.accountId, accountData.username, accountData.password]

    const [account] = await db.query(query, values)

    res.status(200).send(account.insertedId);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const updateAccount = async (req, res) => {
  const accountId = req.params.id
  const accountData = req.body;

  const errorMessages = validatePost(accountData)

  if(errorMessages.length > 0){
      res.status(400).send(json(errorMessages))
      return;
  }
  
  try{
    const query = "UPDATE accounts SET username = ?, password = ? WHERE accountId = ?"
    const values = [accountData.username, accountData.password, accountId]
  
    const account = await db.query(query, values)
  
    res.status(200).send(account);
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
  
    res.send(account);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};