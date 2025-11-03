import { getAllFriends, getAllUserFriends, createFriend } from "../models/friendModel";
import { Request, Response } from "express";
import z from "zod";

const addFriendSchema = z.object({
    id: z.string("Recieved data wasn't a text").min(1,"Id must have a value"),
    f_id: z.string("Recieved data wasn't a text").min(1,"Id must have a value").optional(),
});

type FriendSchema = z.infer<typeof addFriendSchema>;

export async function getFriends(req: Request, res: Response){
    try {
        const friends = await getAllFriends();
        res.status(200).json(friends);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
        res.status(500).json({ 
            message: "getFriends error",
            error: error,
         });
    }
}

export async function getUserFriends(req: Request, res: Response){
    try {
        const friends = await getAllUserFriends(req.params.id);
        res.status(200).json(friends);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
        res.status(500).json({ 
            message: "getUserFriends error",
            error: error,
         });
    }
}

export async function addFriend(req: Request, res: Response){
    try {
        const { id, f_id }: FriendSchema = req.body;
        if(!id || !f_id) return res.status(400).json({ error: "We lack one of the IDs"})
        const newFriend = await createFriend(id, f_id);
        res.status(201);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
        res.status(500).json({ 
            message: "addFriend error",
            error: error,
         });
    }
}