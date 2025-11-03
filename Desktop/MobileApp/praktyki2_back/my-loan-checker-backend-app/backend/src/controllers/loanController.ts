import { getAllLoans, getAllUserLoans, getAllUserGivenLoans } from "../models/loanModel";
import { Request, Response } from "express";

export async function getLoans(req: Request, res: Response) {
    try {
        const loans = await getAllLoans();
        res.status(200).json(loans);
    } catch (error) {
        console.log(`getLoans Error: ${error}`);
    }
}

export async function getUserLoans(req: Request, res: Response) {
    try {
        const loans = await getAllUserLoans(req.params.id);
        res.status(200).json(loans);
    } catch (error) {
        console.log(`getUserLoans Error: ${error}`);
    }
}

export async function getUserGivenLoans(req: Request, res: Response) {
    try {
        const loans = await getAllUserGivenLoans(req.params.id);
        res.status(200).json(loans);
    } catch (error) {
        console.log(`getUserGivenLoans Error: ${error}`);
    }
}