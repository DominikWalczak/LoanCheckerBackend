import db from "../db/db.js";

export function getAllUsers(){
    try {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users_login", (err, results) =>{
                if (err) return reject(err);
                resolve(results);
            })
        });
    } catch(error) {
        console.log(`getAllUsers Error: ${error}`);
    }
}

export function getUserById(id){
    try {
        return new Promise((resolve, reject) =>{
            db.query("SELECT * FROM users WHERE id = ?", [id], (err, results))
            if (err) return reject(err);
            resolve(results[0]);
        });
    } catch(error ){
        console.log(`getUserById Error: ${error}`);
    }

}

export function createUser(password, email){ // do dokończenia
    try {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO users_login (password, email) VALUES (?, ?)", [password, email])
        });
    } catch (error) {
        console.log(`createUser Error: ${error}`);
    }
}