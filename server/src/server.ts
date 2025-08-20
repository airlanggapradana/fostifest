import express, {Application} from "express";
import cors from "cors";
import {env} from "./env";
import userRouter from "./controllers/user.controller";
import {errorHandler} from "./middlewares/errorHandler";
import competitionRouter from "./controllers/competition.controller";
import registrationRouter from "./controllers/registration.controller";
import authRouter from "./controllers/auth.controller";

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:5173', // Ganti dengan URL frontend Anda
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (_req, res) => {
  res.send('Welcome to the server!');
})

app.use('/api/user', userRouter)
app.use('/api/competition', competitionRouter)
app.use('/api/registration', registrationRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
})