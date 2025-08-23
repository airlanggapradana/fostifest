import {Router} from "express";
import {deleteUser, getAllUsers, getUserDetails, newUser, updateUser} from "../services/user.service";

const userRouter = Router();

userRouter.post('/', newUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUserDetails)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter;