import { Router } from "express";
const router = Router();
import { allRoles } from "../controllers/roleController.js";

router.get(`/all`, allRoles);

export default router;
