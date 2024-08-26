import express from "express";
import { deleteProfile, getMe, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute ,getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-my-profile", protectRoute, updateProfile);
router.delete("/delete-my-profile", protectRoute, deleteProfile);



export default router;