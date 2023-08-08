import db from "../db.js";
import { validatePost } from "../services/validation.js";

const DATABASE_ERROR_MESSAGE = "Internal Server Error"

export const getAllPosts = async (req, res) => {

  try{
    const query = 
    `SELECT 
      p.postId AS postId, 
      p.title AS title, 
      p.content AS content, 
      a.accountId AS accountId, 
      a.username AS username 
    FROM posts p INNER JOIN accounts a on a.accountId = p.accountId`
    const [posts] = await db.query(query)
  
    return res.status(200).json(posts);
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const getPost = async (req, res) => {
  const postId = req.params.id

  try{
    const query = 
    `SELECT 
      p.postId AS postId, 
      p.title AS title, 
      p.content AS content, 
      a.accountId AS accountId, 
      a.username AS username 
    FROM posts p INNER JOIN accounts a on a.accountId = p.accountId WHERE postId = ?`

    const [post] = await db.query(query, [postId])
    
    return res.status(200).json(post);
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const createPost = async (req, res) => {
    const postData = req.body;

    const validationErrors = validatePost(postData)

    if(validationErrors.length > 0){
        return res.status(400).json({errors: validationErrors})
    }

    try{
      const query = "INSERT INTO posts (accountId, title, content) VALUES (?, ?, ?)"
      const values = [postData.accountId, postData.title, postData.content]

      const [post] = await db.query(query, values)

      return res.status(200).json(post.insertId);
    }
    catch(error){
      return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
    }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id
  const postData = req.body;

  //Check if the user is updating his account
  if(req.userId != postData.accountId){
    return res.status(401).json({ errors: ['Wrong user'] });
  }

  const validationErrors = validatePost(postData)

  if(validationErrors.length > 0){
      return res.status(400).json({errors: validationErrors})
  }
  
  try{
    const query = "UPDATE posts SET accountId = ?, title = ?, content = ? WHERE postId = ?"
    const values = [postData.accountId, postData.title, postData.content, postId]
  
    const post = await db.query(query, values)
  
    return res.status(200).json(post);
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id

  //Get accountId of the comment
  const result = await getAccountIdbyPostId(res, postId)

  //Check if the user is updating his account
  if(req.userId != result[0].accountId){
    return res.status(401).json({ errors: ['Wrong user'] });
  }

  try{

    //Delete comments that are tied to the post first
    const queryComments = "DELETE FROM comments WHERE postId = ?"
    await db.query(queryComments, [postId])

    //Delete post
    const queryPost = "DELETE FROM posts WHERE postId = ?"
    await db.query(queryPost, [postId])
    
    return res.json("Post succesfully deleted");
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
};

async function getAccountIdbyPostId(res, postId){
  try{
    const query = "SELECT accountId FROM posts WHERE postId = ?"

    const [accountId] = await db.query(query, [postId])
    return accountId
  }
  catch(error){
    return res.status(500).json({errors: [DATABASE_ERROR_MESSAGE]});
  }
}