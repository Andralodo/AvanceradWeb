// -----------------------------------------------------------------------------------------------------------------------
//                   GOOGLE AUTHENTICATION (SCRAPPED IN FAVOR OF PASSWORD GRANT CREDENTIAL IMPLEMENTATION)
// -----------------------------------------------------------------------------------------------------------------------
// export const GOOGLE_CLIENT_ID =
//   process.env.GOOGLE_CLIENT_ID ||
//   "699675012559-sp5na66gtv6ishpol1soo2evgoj0tg0b.apps.googleusercontent.com";
// export const GOOGLE_CLIENT_SECRET =
//   process.env.GOOGLE_CLIENT_SECRET || "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";
// export const REDIRECT_URI = "http://localhost:8080/api/accounts/auth/google/callback";
// -----------------------------------------------------------------------------------------------------------------------
//                   GOOGLE AUTHENTICATION (SCRAPPED IN FAVOR OF PASSWORD GRANT CREDENTIAL IMPLEMENTATION)
// -----------------------------------------------------------------------------------------------------------------------


export const SERVER_ROOT_URI = "http://localhost:8000";
export const UI_ROOT_URI = "http://localhost:5173";
export const JWT_ACCESS_TOKEN_SECRET = 
  process.env.JWT_ACCESS_TOKEN_SECRET || "shhhhh";
export const JWT_ID_TOKEN_SECRET = 
  process.env.JWT_ID_TOKEN_SECRET || "jababa";
export const JWT_EXPIRATION_TIME = 
  process.env.JWT_EXPIRATION_TIME || "1h";