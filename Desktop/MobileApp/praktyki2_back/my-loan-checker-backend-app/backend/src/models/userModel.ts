import db from "../db/db";
import { RowDataPacket, ResultSetHeader  } from "mysql2";

interface User extends RowDataPacket{
    id: string,
    email: string,
    password: string,
}

interface Users extends RowDataPacket{
    id: string,
    name: string,
    vorname: string,
}

export function getAllUsers(): Promise <Users[] | null>{
    return new Promise((resolve, reject) => {
        db.query<Users[]>("SELECT id, name, vorname FROM users", (err, results) =>{
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export function getUserPersonalById(id: string): Promise <Users | null>{ //dla zalogowanego użytkownika który chce zedytować dane swojego konta
    return new Promise((resolve, reject) => {
        db.query<Users[]>("SELECT * FROM users WHERE id = ?", [id], (err, results) =>{
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
}

export function getUserById(id: string): Promise <Users | null>{ //dla zalogowanego użytkownika który chce sprawdzić profil jednego z znajomych
    return new Promise((resolve, reject) => {
        db.query<Users[]>("SELECT id, name, vorname FROM users WHERE id = ?", [id], (err, results) =>{
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
}

export function getUserByEmail(email: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    db.query<User[]>(
      "SELECT * FROM users_login JOIN users ON users.login_id = users_login.id WHERE email = ?",
      [email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0] ?? null);
    });
  });
}
export function createUser(email: string, password: string, name: string, vorname: string, pesel: string){
    return new Promise((resolve, reject) => {
        db.query<ResultSetHeader >(
            "INSERT INTO users_login (password, email) VALUES (?, ?)",
            [password, email],
            (err, results) => {
                if (err) return reject(err);

                const loginId = results.insertId; 


                db.query<ResultSetHeader>(
                    "INSERT INTO users (name, vorname, pesel, login_id) VALUES (?, ?, ?, ?)",
                    [name, vorname, pesel, loginId],
                    (err2, results2) => {
                        if (err2) return reject(err2);
                        resolve(results2);
                    }
                );
            }
        );
    });
}