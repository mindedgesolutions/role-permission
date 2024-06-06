import { Router } from "express";
const router = Router();
import { allUsers, currentUser } from "../controllers/userController.js";

router.get(`/current`, currentUser);
router.get(`/all`, allUsers);

export default router;
