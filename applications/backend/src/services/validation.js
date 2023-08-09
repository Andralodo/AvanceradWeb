import exp from "constants"

export function validateAccount(accountData){
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

  export function validateComment(commentData){
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

  export function validatePost(postData){
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