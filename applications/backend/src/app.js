import express from 'express'
import bodyParser from 'body-parser';

import postRoutes from './routes/postRoutes.js';
import accountRoutes from './routes/accountRoutes.js';

const app = express()
const PORT = 8080
app.use(bodyParser.json());

app.use("/posts", postRoutes)
app.use("/accounts", accountRoutes)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))