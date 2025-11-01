import db from "../db/db.js";
import { RowDataPacket  } from "mysql2";

export function getAllFriends(){
    try {
        return new Promise((resolve, reject) =>{
            db.query<RowDataPacket[]>("SELECT * FROM friends", (err, results) => {
                if (err) return reject;
                resolve(results);
            });
        });
    } catch (error) {
        console.log(`getAllFriends Error: ${error}`);
    }
}
 export function getAllUserFriends(id: string){
    try {
        return new Promise((resolve, reject) =>{
            db.query<RowDataPacket[]>("SELECT * FROM friends WHERE user_id=?", [id], (err, results) =>{
            if (err) return reject;
            resolve(results);
            });
        });
    } catch (error) {
        console.log(`getAllUserFriends Error: ${error}`);
    }
 }

 export function createFriend(id: string, f_id: string){ // do dokończenia
    try {
        return new Promise((resolve, reject) =>{
            db.query<RowDataPacket[]>("INSERT INTO friends (user_id, friend_id) VALUES (?, ?)", [id, f_id]);
        });
    } catch (error) {
        console.log(`createFriend Error: ${error}`);
    }
 }