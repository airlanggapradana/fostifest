import express, {Application} from "express";
import cors from "cors";
import {env} from "./env";
import userRouter from "./controllers/user.controller";
import {errorHandler} from "./middlewares/errorHandler";
import competitionRouter from "./controllers/competition.controller";
import registrationRouter from "./controllers/registration.controller";
import authRouter from "./controllers/auth.controller";
import paymentRouter from "./controllers/payment.controller";
import exportRouter from "./controllers/export.controller";
import adminRouter from "./controllers/admin.controller";
import {decodeJwtWithoutVerify} from "./middlewares/authorization.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
})