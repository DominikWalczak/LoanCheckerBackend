import express from "express";
import { getLoans, getUserLoans, getUserGivenLoans } from "../controllers/loanController";

const router = express.Router();

router.get("/", getLoans);

router.get("/:id", getUserLoans, getUserGivenLoans);


export default router;