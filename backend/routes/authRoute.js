import { Router } from "express";
const router = Router();
import { loginUser, userAccess } from "../controllers/authController.js";
import { validateLogin } from "../middlewares/authMiddleware.js";
import { checkAccess } from "../middlewares/accessMiddleware.js";

router.post(`/login`, validateLogin, loginUser);
router.get(`/access`, checkAccess, userAccess);

export default router;
