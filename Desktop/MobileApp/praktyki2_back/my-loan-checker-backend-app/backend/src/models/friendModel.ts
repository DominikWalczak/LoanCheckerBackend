import db from "../db/db.js";
import { RowDataPacket  } from "mysql2";

export function getAllFriends(){
    return new Promise((resolve, reject) =>{
        db.query<RowDataPacket[]>("SELECT * FROM friends", (err, results) => {
            if (err) return reject;
            resolve(results);
        });
    });
}
 export function getAllUserFriends(id: string){
    return new Promise((resolve, reject) =>{
        db.query<RowDataPacket[]>("SELECT * FROM friends WHERE user_id=?", [id], (err, results) =>{
        if (err) return reject;
        resolve(results);
        });
    });
 }

 export function createFriend(id: string, f_id: string){ // do dokończenia
    return new Promise((resolve, reject) =>{
        db.query<RowDataPacket[]>("INSERT INTO friends (user_id, friend_id) VALUES (?, ?)", [id, f_id]);
    });
 }