import express from "express";
import { getAllUsers, login, signUpUser } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup",signUpUser);
userRouter.get("/login",login);

export default userRouter;
