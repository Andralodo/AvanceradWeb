import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import postRoutes from './routes/postRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express()
const PORT = 8080

app.use(cookieParser());
app.use(bodyParser.json());

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true
}

app.use(cors(corsOptions))

app.use("/api/posts", postRoutes)
app.use("/api/accounts", accountRoutes)
app.use("/api/comments", commentRoutes)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))