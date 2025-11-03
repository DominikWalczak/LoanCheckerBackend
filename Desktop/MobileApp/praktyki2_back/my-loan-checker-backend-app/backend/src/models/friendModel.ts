import db from "../db/db";
import { RowDataPacket  } from "mysql2";

interface Friend extends RowDataPacket{
    id: string,
    user_id: string,
    friend_id: string,
}

export function getAllFriends(): Promise<Friend[] | null>{
    return new Promise((resolve, reject) =>{
        db.query<Friend[]>("SELECT * FROM friends", (err, results) => {
            if (err) return reject;
            resolve(results);
        });
    });
}
 export function getAllUserFriends(id: string): Promise<Friend[] | null>{
    return new Promise((resolve, reject) =>{
        db.query<Friend[]>("SELECT * FROM friends WHERE user_id=?", [id], (err, results) =>{
        if (err) return reject;
        resolve(results);
        });
    });
 }

 export function createFriend(id: string, f_id: string){ 
    return new Promise((resolve, reject) =>{
        db.query<RowDataPacket[]>("INSERT INTO friends (user_id, friend_id) VALUES (?, ?)", [id, f_id], 
            (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
 }