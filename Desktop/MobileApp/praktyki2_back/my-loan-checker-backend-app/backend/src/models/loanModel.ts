import db from "../db/db.js";
import { RowDataPacket  } from "mysql2";

export function getAllLoans(){
    return new Promise((resolve, reject) => {
        db.query<RowDataPacket[]>("SELECT * FROM loans", (err, results) =>{
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export function getAllUserLoans(id: string){
    return new Promise((resolve, reject) => {
        db.query<RowDataPacket[]>("SELECT * FROM loans WHERE borrower_id=?", [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export function getAllUserGivenLoans(id: string){
    return new Promise((resolve, reject) => {
        db.query<RowDataPacket[]>("SELECT * FROM loans WHERE lender_id=?", [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}