import { getAllUsers, getUserById, getUserByEmail, createUser } from "../models/userModel.js";

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

export async function getUseByEmail(req, res){
    try {
        const user = await getUserByEmail(req.params.email)
        if (!user) return console.log("User not found");
    } catch (error) {
        console.log(`getUseByEmail Error: ${error}`);
    }
}


export async function addUser(req, res) {
    const { email, password, name, vorname, pesel } = req.body;
    if (!email || !password || !name || !vorname || !pesel) return res.status(400).json({ error: "We lack required data"});

    try {
        const newUser = await createUser(email, password, name, vorname, pesel);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(`addUser Error: ${error}`);
    }
}