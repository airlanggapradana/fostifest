import express, {Application} from "express";
import cors from "cors";
import {env} from "./env";
import userRouter from "./controllers/user.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (_req, res) => {
  res.send('Welcome to the server!');
})

app.use('/api/user', userRouter)

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
})