import db from "../db/db.js";

export function getAllUsers(){
    try {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users_login", (err, results) =>{
                if (err) return reject(err);
                resolve(results);
            });
        });
    } catch(error) {
        console.log(`getAllUsers Error: ${error}`);
    }
}

export function getUserById(id){
    try {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE id = ?", [id], (err, results))
            if (err) return reject(err);
            resolve(results[0]);
        });
    } catch(error ){
        console.log(`getUserById Error: ${error}`);
    }

}

export function getUserByEmail(email){
    try {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users_login WHERE email = ?", [email], (err, results) =>{
                if (err) return reject(err);
                console.log(2)
                console.log(results[0])
                resolve(results[0]);
            });
        });
    } catch(error ){
        console.log(`getUserById Error: ${error}`);
    }

}

export function createUser(email, password, name, vorname, pesel) {
    try {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO users_login (password, email) VALUES (?, ?)",
                [password, email],
                (err, result) => {
                    if (err) return reject(err);
    
                    const loginId = result.insertId; 
    
    
                    db.query(
                        "INSERT INTO users (name, vorname, pesel, login_id) VALUES (?, ?, ?, ?)",
                        [name, vorname, pesel, loginId],
                        (err2, result2) => {
                            if (err2) return reject(err2);
                            resolve(result2);
                        }
                    );
                }
            );
        });
    } catch (error) {
        console.log(`createUser Error: ${error}`);
    }
}