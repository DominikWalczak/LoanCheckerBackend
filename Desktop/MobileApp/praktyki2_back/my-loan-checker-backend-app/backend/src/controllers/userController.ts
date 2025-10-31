import { getAllUsers, getUserById, getUserByEmail, createUser } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import z from "zod";

const saltRounds: number = 12;

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

const getByEmailSchema = z.object({
    email: z.string("Recieved data wasn't a text").email("Written data must be an email, example: x@x.x").min(5, " cannot be empty"),
    password: z.string("Recieved data wasn't a text").min(1, " cannot be empty"),
});

export async function getByEmail(req, res){
    try {
        const validateData = getByEmailSchema.safeParse(req.body)
        if(!validateData.success){
            console.log(6)
            return res.status(400).json({ 
                message: `We lack required data`,
                error: validateData.error,
        });
        }
        const user = await getUserByEmail(validateData.data.email)
        console.log(validateData.data.email);
        console.log(validateData.data.password);
        const validateData2 = getByEmailSchema.safeParse(user);
        if (!validateData2.success){
            console.log(8)
            console.log(validateData2.error);
            return res.status(400).json({ 
                message: "User not found",
                error: validateData2.error,
        });
        }
        console.log(user.email);
        console.log(user.password);
        console.log(user);
        const isPasswordValid = validateData.data.password === user.password;
        if (!isPasswordValid) return res.status(401).json({ message: "Wrong password" });
        return res.status(200).json("valid");
    } catch (error) {
        console.log(`getByEmail Error: ${error}`);
    }
}

const addUserSchema = z.object({
    email: z.string("Recieved data wasn't a text").email("Written data must be an email, example: x@x.x").min(5, "Email cannot be empty/Email must be longer than 5 characters"),
    password: z.string("Recieved data wasn't a text").min(1, "Password cannot be empty"),
    name: z.string("Recieved data wasn't a text").min(1, "Name cannot be empty"),
    vorname: z.string("Recieved data wasn't a text").min(1, "Vorname cannot be empty"),
    pesel: z.string("Recieved data wasn't a text").min(11, "PESEL must have 11 digits").max(11, "PESEL must have 11 digits"),
});

export async function addUser(req, res) {
    const validateData = addUserSchema.safeParse(req.body);
    if (!validateData.success){
        return res.status(400).json({ 
            message: `We lack required data`,
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