import { Router } from "express";
const router = Router();
import { currentUser } from "../controllers/userController.js";

router.get(`/current`, currentUser);

export default router;
