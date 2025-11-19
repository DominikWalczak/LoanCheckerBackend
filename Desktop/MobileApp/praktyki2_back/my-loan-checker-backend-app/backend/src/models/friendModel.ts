import db from "../db/db";
import { RowDataPacket, ResultSetHeader  } from "mysql2";

interface Friend extends RowDataPacket{
    id: number,
    user_id: number,
    friend_id: number,
    friend_list_id?: number | null,
    accepted?: boolean,
    pending?: boolean,
    name?: string,
    vorname?: string
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
        db.query<Friend[]>("SELECT f.id, f.user_id, f.friend_id, u.name, u.vorname FROM friends AS f JOIN users AS u ON u.user_id = f.user_id WHERE user_id=?", [id], (err, results) =>{
        if (err) return reject;
        resolve(results);
        });
    });
 }

 export function createFriend(id: string, f_id: string, requestId: string){ 
    console.log(13);
    return new Promise((resolve, reject) =>{
        console.log(14);
        db.query<ResultSetHeader>("INSERT INTO friends (user_id, friend_id) VALUES (?, ?)", [id, f_id], 
            (err, results) => {
            if (err) return reject(err);

            const pendingId = results.insertId; 
            
            db.query<ResultSetHeader>("UPDATE pending_friend_requests SET accepted = ?, friend_list_id = ?, pending = ? WHERE id = ? AND pending = ?", [true, pendingId, false, requestId, true], 
            (err, results2) => {
            if (err) return reject(err);

                resolve(results2);
            });
        });
    });
 }

 export function checkFriendRequest(id: string, f_id: string){
    return new Promise((resolve, reject) => {
        db.query<Friend[]>("SELECT * FROM pending_friend_requests WHERE user_id = ? AND friend_id = ?", [id, f_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
 }

 export function createFriendRequest(id: string, f_id: string){
    return new Promise((resolve, reject) => {
        db.query<ResultSetHeader>("INSERT INTO pending_friend_requests (user_id, friend_id) VALUES (?, ?)", [id, f_id], 
            (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
 }

 export function denyFriendRequest(request_id: string){
    return new Promise((resolve, reject) =>{
        db.query<ResultSetHeader>("UPDATE pending_friend_requests SET pending = ? WHERE requestId = ?", [false, request_id] ,(err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
 }

 export function getFriendRequests(id: string): Promise<Friend[] | null> {
    return new Promise((resolve, reject) =>{
        db.query<Friend[]>("SELECT p.id, p.user_id, p.friend_id, p.accepted, p.pending, u.name, u.vorname FROM pending_friend_requests AS p JOIN users AS u ON p.user_id = u.id WHERE p.friend_id = ? AND p.pending = ?", [id, true] ,(err, results) => {
            if (err) return reject(err);
            console.log(results)
            resolve(results);
        });
    });
 }