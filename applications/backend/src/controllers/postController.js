import db from "../db.js";

const DATABASE_ERROR_MESSAGE ="Internal Server Error"

function validatePost(postData){
  const minTitleLength = 3
  const maxTitleLength = 20

  const minContentLength = 5
  const maxContentLength = 100


  const validationErrors = []
  if(postData.title){
      if (postData.title.length < minTitleLength) {
          validationErrors.push("The title needs to be at least " + minTitleLength + " characters.")
      }
  
      if (postData.title.length > maxTitleLength) {
          validationErrors.push("The title cant contain more than " + maxTitleLength + " characters.")
      }
  }
  else{
      validationErrors.push("Title cannot be empty")
  }

  if(postData.content){
    if (postData.content.length < minContentLength) {
        validationErrors.push("The content needs to be at least " + minContentLength + " characters.")
    }

    if (postData.content.length > maxContentLength) {
        validationErrors.push("The content cant contain more than " + maxContentLength + " characters.")
    }
  }
  else{
    validationErrors.push("Content cannot be empty")
  }
  return validationErrors
}

export const getAllPosts = async (req, res) => {
    
  try{
    const query = "SELECT * FROM posts"
    const [posts] = await db.query(query)
  
    res.status(200).send(posts);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const getPost = async (req, res) => {
  
  try{
    const query = "SELECT * FROM posts WHERE postId = ?"
    const postId = req.params.id
  
    const [post] = await db.query(query, [postId])
  
    res.status(200).send(post);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const createPost = async (req, res) => {
  const postData = req.body;

  console.log(postData)

  const errorMessages = validatePost(postData)

  console.log(errorMessages)

  if(errorMessages.length > 0){
      res.status(400).send(errorMessages)
      return;
  }

  try{
    const query = "INSERT INTO posts (accountId, title, content) VALUES (?, ?, ?)"
    const values = [postData.accountId, postData.title, postData.content]

    const [post] = await db.query(query, values)

    res.status(200).json(post.insertId);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id
  const postData = req.body;

  const errorMessages = validatePost(postData)

  if(errorMessages.length > 0){
      res.status(400).send(json(errorMessages))
      return;
  }
  
  try{
    const query = "UPDATE posts SET accountId = ?, title = ?, content = ? WHERE postId = ?"
    const values = [postData.accountId, postData.title, postData.content, postId]
  
    const post = await db.query(query, values)
  
    res.status(200).send(post);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id

  try{

    //Delete comments that are tied to the post first
    const queryComments = "DELETE FROM comments WHERE postId = ?"
    const comments = await db.query(queryComments, [postId])

    //Delete post
    const queryPost = "DELETE FROM posts WHERE postId = ?"
    const post = await db.query(queryPost, [postId])
    
    res.send("Post succesfully deleted");
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};