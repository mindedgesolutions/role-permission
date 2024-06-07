import { Router } from "express";
const router = Router();
import {
  activateUser,
  allUsers,
  currentUser,
  deleteUser,
} from "../controllers/userController.js";

router.get(`/current`, currentUser);
router.get(`/all/:type?`, allUsers);
router.delete(`/delete/:id`, deleteUser);
router.post(`/activate/:id`, activateUser);

export default router;
