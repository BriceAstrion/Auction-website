import express from 'express';
import cors from 'cors';
import users from './routes/users.js';
import tokensRouter from './routes/tokens.js';
import bodyParser from "body-parser";

const app = express()
const port = 3000

app.use(express.json());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors ({ origin: 'http://localhost:5173' }));

app.use("/users", users);
app.use("/tokens", tokensRouter)

app.listen(port, () => {
  console.log(`Website app listening on port ${port}`)
})