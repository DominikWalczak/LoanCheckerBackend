import express from "express";
import { getUsers, getUser, addUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", addUser);

router.post("/:email", addUser);


export default router;