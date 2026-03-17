import { Router } from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { registerValidator, loginValidator } from "../validator/auth.validator.js";
const router = Router()



router.post("/register",registerValidator, register)
router.post("/login",loginValidator, login)
router.get("/get-me", authUser, getMe)
router.get("/logout", logout);



export default router
