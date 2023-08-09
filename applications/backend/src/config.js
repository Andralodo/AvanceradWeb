export const SERVER_ROOT_URI = "http://localhost:8000";
export const UI_ROOT_URI = "http://localhost:5173";
export const JWT_ACCESS_TOKEN_SECRET = 
  process.env.JWT_ACCESS_TOKEN_SECRET || "shhhhh";
export const JWT_ID_TOKEN_SECRET = 
  process.env.JWT_ID_TOKEN_SECRET || "jababa";
export const JWT_EXPIRATION_TIME = 
  process.env.JWT_EXPIRATION_TIME || "1h";