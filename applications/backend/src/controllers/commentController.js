import db from "../db.js";

const DATABASE_ERROR_MESSAGE ="Internal Server Error"

function validateComment(commentData){
  const minCommentLength = 3
  const maxCommentLength = 20


  const validationErrors = []
  if(commentData.comment){
      if (commentData.comment.length < minCommentLength) {
          validationErrors.push("The comment needs to be at least " + minCommentLength + " characters.")
      }
  
      if (commentData.comment.length > maxCommentLength) {
          validationErrors.push("The comment cant contain more than " + maxCommentLength + " characters.")
      }
  }
  else{
      validationErrors.push("Comment cannot be empty")
  }
  return validationErrors
}

export const getAllCommentsByPostId = async (req, res) => {

  const postId = req.params.postId
    
  try{
    const query = "SELECT * FROM comments WHERE postId = ?"
    const [comments] = await db.query(query, [postId])
  
    res.status(200).json(comments);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const getComment = async (req, res) => {
  const commentId = req.params.commentId

  try{
    const query = "SELECT * FROM comments WHERE commentId = ?"
  
    const [comment] = await db.query(query, [commentId])
  
    res.status(200).json(comment);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const createComment = async (req, res) => {
  const commentData = req.body;

  console.log(commentData)

  const errorMessages = validateComment(commentData)

  console.log(errorMessages)

  if(errorMessages.length > 0){
      res.status(400).send(errorMessages)
      return;
  }

  try{
    const query = "INSERT INTO comments (accountId, postId, comment) VALUES (?, ?, ?)"
    const values = [commentData.accountId, commentData.postId, commentData.comment]

    const [comment] = await db.query(query, values)

    res.status(200).json(comment);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const updateComment = async (req, res) => {
  const commentData = req.body;

  const errorMessages = validateComment(commentData)

  if(errorMessages.length > 0){
      res.status(400).send(errorMessages)
      return;
  }
  
  try{
    const query = "UPDATE comments SET comment = ? WHERE commentId = ?"
    const values = [commentData.comment, commentData.commentId]
  
    const [comment] = await db.query(query, values)
  
    res.status(200).json(comment);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.commentId

  console.log(commentId)

  try{
    const query = "DELETE FROM comments WHERE commentId = ?"

    const [comment] = await db.query(query, [commentId])
  
    res.json(comment);
  }
  catch(error){
    res.status(500).send(DATABASE_ERROR_MESSAGE);
  }
};