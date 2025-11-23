import express from "express";
import { getFriends, getUserFriends, addFriend, acceptFriend, denyFriend, getRequests, getUninvited } from "../controllers/friendController";

const router = express.Router();

router.get("/", getFriends);

router.get("/:id", getUserFriends);

router.post("/invite", getUninvited);

router.post("/pending/request", getRequests);

router.post("/pending", addFriend);

router.post("/pending/accept", acceptFriend);

router.post("/pending/deny", denyFriend);




export default router;