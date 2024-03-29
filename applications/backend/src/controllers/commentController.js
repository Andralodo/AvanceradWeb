import db from "../db.js";
import { validateComment } from "../services/validation.js";

const DATABASE_ERROR_MESSAGE = "Internal Server Error"


export const getAllCommentsByPostId = async (req, res) => {
  const postId = req.params.postId

  try{
    const query = 
    `SELECT 
      c.commentId AS commentId, 
      c.postId AS postId, 
      c.comment AS comment, 
      a.accountId AS accountId, 
      a.username AS username 
    FROM comments c INNER JOIN accounts a on a.accountId = c.accountId WHERE postId = ?`
    const [comments] = await db.query(query, [postId])
  
    return res.status(200).json(comments);
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const createComment = async (req, res) => {
  const commentData = req.body;

  const validationErrors = validateComment(commentData)

  if(validationErrors.length > 0){
      return res.status(400).json({errors: validationErrors})
  }

  try{
    const query = "INSERT INTO comments (accountId, postId, comment) VALUES (?, ?, ?)"
    const values = [commentData.accountId, commentData.postId, commentData.comment]

    const [comment] = await db.query(query, values)

    return res.status(200).json({message: "Successfully created comment"});
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const updateComment = async (req, res) => {
  const commentData = req.body;
  const commentId = req.params.commentId;

  //Check if the user is updating his account
  if(req.userId != commentData.accountId){
    return res.status(401).json({ errors: ['Wrong user'] });
  }

  const validationErrors = validateComment(commentData)

  if(validationErrors.length > 0){
      return res.status(400).json({errors: validationErrors})
  }
  
  try{
    const query = "UPDATE comments SET comment = ? WHERE commentId = ?"
    const values = [commentData.comment, commentId]
  
    const [comment] = await db.query(query, values)
  
    return res.status(200).json({message: "Successfully edited comment"});
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.commentId

  //Get accountId of the comment
  const result = await getAccountIdbyCommentId(res, commentId)

  //Check if the user is updating his account 
  if(req.userId != result[0].accountId){
    return res.status(401).json({ errors: ['Wrong user'] });
  }

  try{
    const query = "DELETE FROM comments WHERE commentId = ?"

    const [comment] = await db.query(query, [commentId])
  
    return res.status(200).json(comment);
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

async function getAccountIdbyCommentId(res, commentId){
  try{
    const query = "SELECT accountId FROM comments WHERE commentId = ?"

    const [accountId] = await db.query(query, [commentId])
    return accountId
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
}