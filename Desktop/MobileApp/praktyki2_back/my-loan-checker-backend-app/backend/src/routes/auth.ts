import express from "express";
import { refreshTokenController } from "../controllers/authController";

const router = express.Router();

router.post("/refresh", refreshTokenController);


export default router;