import express, {Application} from "express";
import cors from "cors";
import userRouter from "./controllers/user.controller";
import {errorHandler} from "./middlewares/errorHandler";
import competitionRouter from "./controllers/competition.controller";
import registrationRouter from "./controllers/registration.controller";
import authRouter from "./controllers/auth.controller";
import paymentRouter from "./controllers/payment.controller";
import exportRouter from "./controllers/export.controller";
import adminRouter from "./controllers/admin.controller";
import {decodeJwtWithoutVerify} from "./middlewares/authorization.middleware";
import {env} from "./env";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(
  cors({
    // Change this to your frontend origin for better security
    origin: env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', (_req, res) => {
  res.send('Welcome to the server!');
})

app.use('/api/user', userRouter)
app.use('/api/competition', competitionRouter)
app.use('/api/registration', registrationRouter)
app.use('/api/auth', authRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/export', exportRouter)
app.use('/api/admin', decodeJwtWithoutVerify, adminRouter)

app.use(errorHandler)

export default app;