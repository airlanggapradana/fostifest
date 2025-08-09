import {Router} from "express";
import {newUser} from "../services/user.service";

const userRouter = Router();

userRouter.post('/', newUser)

export default userRouter;