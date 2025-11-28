import express from "express";
import { deleteFriendRequest, getFriends, getMyRequests, getUserFriends, addFriend, acceptFriend, denyFriend, getRequests, getUninvited } from "../controllers/friendController";

const router = express.Router();

router.get("/", getFriends);

router.post("/list", getUserFriends);

router.post("/invite", getUninvited);

router.post("/pending/request", getRequests);

router.post("/pending/request/my", getMyRequests);

router.post("/pending/request/my/delete", deleteFriendRequest);

router.post("/pending", addFriend);

router.post("/pending/accept", acceptFriend);

router.post("/pending/deny", denyFriend);




export default router;