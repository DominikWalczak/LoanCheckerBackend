import db from "../db/db";
import { RowDataPacket, ResultSetHeader  } from "mysql2";

interface Loan extends RowDataPacket{
    id: string, 
    lender_id: string,
    borrower_id: string,
    amount: number,
    description: string,
    status: string,
    created_at: Date,
}


export function getAllLoans(): Promise<Loan[] | null>{
    return new Promise((resolve, reject) => {
        db.query<Loan[]>("SELECT * FROM loans", (err, results) =>{
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export function getAllUserLoans(id: string): Promise<Loan[] | null>{
    return new Promise((resolve, reject) => {
        db.query<Loan[]>("SELECT * FROM loans WHERE borrower_id=?", [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export function getAllUserGivenLoans(id: string): Promise<Loan[] | null>{
    return new Promise((resolve, reject) => {
        db.query<Loan[]>("SELECT * FROM loans WHERE lender_id=?", [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}