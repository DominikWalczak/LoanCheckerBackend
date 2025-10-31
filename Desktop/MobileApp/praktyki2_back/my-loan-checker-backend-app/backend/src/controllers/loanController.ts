import { getAllLoans, getAllUserLoans, getAllUserGivenLoans } from "../models/loanModel.js";

export async function getLoans(req, res) {
    try {
        const loans = await getAllLoans();
        res.json(loans);
    } catch (error) {
        console.log(`getLoans Error: ${error}`);
    }
}

export async function getUserLoans(req, res) {
    try {
        const loans = await getAllUserLoans();
        res.json(loans);
    } catch (error) {
        console.log(`getUserLoans Error: ${error}`);
    }
}

export async function getUserGivenLoans(req, res) {
    try {
        const loans = await getAllUserGivenLoans();
        res.json(loans);
    } catch (error) {
        console.log(`getUserGivenLoans Error: ${error}`);
    }
}