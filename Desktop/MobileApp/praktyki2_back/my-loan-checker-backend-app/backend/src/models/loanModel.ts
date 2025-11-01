import db from "../db/db.js";
import { RowDataPacket  } from "mysql2";

export function getAllLoans(){
    try {
        return new Promise((resolve, reject) => {
            db.query<RowDataPacket[]>("SELECT * FROM loans", (err, results) =>{
                if (err) return reject(err);
                resolve(results);
            });
        });
    } catch (error) {
        console.log(`getAllLoans Error: ${error}`);
    }
}

export function getAllUserLoans(id: string){
    try {
        return new Promise((resolve, reject) => {
            db.query<RowDataPacket[]>("SELECT * FROM loans WHERE borrower_id=?", [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    } catch (error) {
        console.log(`getAllUserLoans Error: ${error}`);
    }   
}

export function getAllUserGivenLoans(id: string){
    try {
        return new Promise((resolve, reject) => {
            db.query<RowDataPacket[]>("SELECT * FROM loans WHERE lender_id=?", [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    } catch (error) {
        console.log(`getAllUserGivenLoans Error: ${error}`);
    }   
}