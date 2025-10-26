import { getAllUsers, getUserById, createUser } from "../models/userModel.js";

export async function getUsers(req, res){
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
    }
}

export async function getUser(req, res){
    try {
        const user = await getUserById(req.params.id)
        if (!user) return console.log("User not found");
    } catch (error) {
        console.log(`getUser Error: ${error}`);
    }
}