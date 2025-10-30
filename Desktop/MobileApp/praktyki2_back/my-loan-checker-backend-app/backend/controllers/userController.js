import { getAllUsers, getUserById, getUserByEmail, createUser } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import z from "zod";

export async function getUsers(req, res){
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
    }
}

export async function getUser(req, res){ // dokończyć
    try {
        const user = await getUserById(req.params.id)
        if (!user) return res.status(404);
        
    } catch (error) {
        console.log(`getUser Error: ${error}`);
    }
}

export async function getByEmail(req, res){
    try {
        const user = await getUserByEmail(req.params.email)
        console.log(user);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!user) res.status(404).json({ message: "User not found" });
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });
        return res.status(200).json("valid");
    } catch (error) {
        console.log(`getByEmail Error: ${error}`);
    }
}

const zodValid = z.object({
    email: z.string().email().min(5),
    password: z.string().min(1),
    name: z.string().min(1),
    vorname: z.string().min(1),
    pesel: z.string().min(1),
})
export async function addUser(req, res) {
    const validateData = zodValid.safeParse(req.body);
    if (!validateData.success){
        return res.status(400).json({ message: `We lack required data`,
            error: validateData.error,
        });
    }
    const { email, password, name, vorname, pesel } = validateData.data;

    try {
        const newUser = await createUser(email, password, name, vorname, pesel);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(`addUser Error: ${error}`);
    }
}