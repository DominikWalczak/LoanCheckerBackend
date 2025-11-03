import express from "express";
import { getUsers, getUser, addUser, getByEmail } from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", addUser);

router.post("/:email", getByEmail);


export default router;