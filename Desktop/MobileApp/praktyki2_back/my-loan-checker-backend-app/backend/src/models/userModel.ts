import db from "../db/db.js";
import { RowDataPacket, ResultSetHeader  } from "mysql2";

interface User extends RowDataPacket{
    id: string;
    email: string;
    password: string;
}

export function getAllUsers(){
    return new Promise((resolve, reject) => {
        db.query<RowDataPacket[]>("SELECT * FROM users_login", (err, results) =>{
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export function getUserById(id: string){
    return new Promise((resolve, reject) => {
        db.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [id], (err, results) =>{
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
}

export function getUserByEmail(email: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    db.query<User[]>(
      "SELECT * FROM users_login WHERE email = ?",
      [email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0] ?? null);
    });
  });
}
export function createUser(email: string, password: string, name: string, vorname: string, pesel: string) {
    return new Promise((resolve, reject) => {
        db.query<ResultSetHeader >(
            "INSERT INTO users_login (password, email) VALUES (?, ?)",
            [password, email],
            (err, result) => {
                if (err) return reject(err);

                const loginId = result.insertId; 


                db.query<ResultSetHeader>(
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
}