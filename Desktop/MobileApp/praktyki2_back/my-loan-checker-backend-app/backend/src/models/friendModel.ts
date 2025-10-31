import db from "../db/db.js";

export function getAllFriends(){
    try {
        return new Promise((resolve, reject) =>{
            db.query("SELECT * FROM friends", (err, results) => {
                if (err) return reject;
                resolve(results);
            });
        });
    } catch (error) {
        console.log(`getAllFriends Error: ${error}`);
    }
}
 export function getAllUserFriends(id){
    try {
        return new Promise((resolve, reject) =>{
            db.query("SELECT * FROM friends WHERE user_id=?", [id], (err, results) =>{
            if (err) return reject;
            resolve(results);
            });
        });
    } catch (error) {
        console.log(`getAllUserFriends Error: ${error}`);
    }
 }

 export function createFriend(id, f_id){ // do dokończenia
    try {
        return new Promise((resolve, reject) =>{
            db.query("INSERT INTO friends (user_id, friend_id) VALUES (?, ?)", [id, f_id]);
        });
    } catch (error) {
        console.log(`createFriend Error: ${error}`);
    }
 }