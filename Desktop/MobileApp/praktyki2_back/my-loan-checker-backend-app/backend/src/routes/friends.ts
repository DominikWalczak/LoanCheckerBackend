import express from "express";
import { getFriends, getUserFriends, addFriend } from "../controllers/friendController";

const router = express.Router();

router.get("/", getFriends);

router.get("/:id", getUserFriends);

router.post("/", addFriend);


export default router;