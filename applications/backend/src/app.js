import express from 'express'
import bodyParser from 'body-parser';

import postRoutes from './routes/postRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express()
const PORT = 8080
app.use(bodyParser.json());

app.use("/api/posts", postRoutes)
app.use("/api/accounts", accountRoutes)
app.use("/api/comments", commentRoutes)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))