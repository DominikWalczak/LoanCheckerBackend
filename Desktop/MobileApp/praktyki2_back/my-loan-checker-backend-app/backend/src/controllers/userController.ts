import { getAllUsers, getUserById, getUserByEmail, createUser } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import z from "zod";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens";

const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');

const addUserSchema = z.object({
    email: z.string("Recieved data wasn't a text").email("Written data must be an email, example: x@x.x").min(5, "Email cannot be empty/Email must be longer than 5 characters"),
    password: z.string("Recieved data wasn't a text").min(1, "Password cannot be empty"),
    name: z.string("Recieved data wasn't a text").min(1, "Name cannot be empty"),
    vorname: z.string("Recieved data wasn't a text").min(1, "Vorname cannot be empty"),
    pesel: z.string("Recieved data wasn't a text").min(11, "PESEL must have 11 digits").max(11, "PESEL must have 11 digits"),
});

const getByEmailSchema = z.object({
    email: z.string("Recieved data wasn't a text").email("Written data must be an email, example: x@x.x").min(5, " cannot be empty"),
    password: z.string("Recieved data wasn't a text").min(1, " cannot be empty"),
});

const getUserSchema = z.object({
    id: z.number("Recieved data wasn't a number"),
    name: z.string("Recieved data wasn't a text"),
    vorname: z.string("Recieved data wasn't a text"),
});
const getUsersSchema = z.array(getUserSchema);

export async function getUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await getAllUsers();
        const validateData = getUsersSchema.safeParse(users)
        if (!validateData.success) {
            res.status(404).json({ 
                message: "Users not found",
                error: validateData.error,
            });
            return;
        }

        res.status(200).json(validateData.data);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
        res.status(500).json({ 
            message: "getUsers error",
            error: error,
         });
    }
}

export async function getUser(req: Request, res: Response): Promise<void> {
    try {
        const user = await getUserById(req.params.id);

        const validateData = getUserSchema.safeParse(user);

        if (!validateData.success) {
            res.status(404).json({ 
                message: "User not found",
                error: validateData.error,
            });
            return;
        }

        res.status(200).json(validateData.data);
    } catch (error) {
        console.log(`getUser Error: ${error}`);
        res.status(500).json({ 
            message: "getUser error",
            error: error,
         });
    }
}

export async function getByEmail(req: Request, res: Response) {
    try {
        console.log(process.env.ACCESS_SECRET);
        console.log(process.env.REFRESH_SECRET);

        const validateData = getByEmailSchema.safeParse(req.body);

        if (!validateData.success) {
            return res.status(400).json({
                message: "Invalid data",
                error: validateData.error,
            });
        }

        const { email, password } = validateData.data;

        const user = await getUserByEmail(email);
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(1234567); // BŁĄD W GENERATEACCESTOKEN
        const accessToken = generateAccessToken(user.id, user.email);
        console.log(123456);

        const refreshToken = generateRefreshToken(user.id, user.email);
        console.log(1234567890);

        const id = user.id;
        console.log(1);
        console.log(1);
        console.log(1);
        console.log(1);
        console.log(1);
        console.log(id);
        console.log(user.id);
        console.log(user);
        console.log(1);
        console.log(1);
        console.log(1);
        console.log(1);
        console.log(1);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong password" });
        }
        return res.status(200).json({ 
            message: "valid", 
            accessToken,
            refreshToken,
            id,
        });
    } catch (error) {
        console.log(`getByEmail Error: ${error}`);
        return res.status(500).json({ 
            message: "getByEmail error",
            error: error,
         });
    }
}

export async function addUser(req: Request, res: Response) { 
    const validateData = addUserSchema.safeParse(req.body);
    if (!validateData.success){
        return res.status(400).json({ 
            message: `We lack required data`,
            error: validateData.error,
        });
    }
    const { email, password, name, vorname, pesel } = validateData.data;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    try {
        const newUser = await createUser(email, hashPassword, name, vorname, pesel);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(`addUser Error: ${error}`);
        return res.status(500).json({ 
            message: "addUser error",
            error: error,
         });
    }
}