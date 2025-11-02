import { getAllFriends, getAllUserFriends, createFriend } from "../models/friendModel.js";
import { Request, Response } from "express";
import z from "zod";

const addFriendSchema = z.object({
    id: z.string("Recieved data wasn't a text").min(1,"Id must have a value"),
    f_id: z.string("Recieved data wasn't a text").min(1,"Id must have a value").optional(),
});

type FriendSchema = z.infer<typeof addFriendSchema>;

export async function getFriends(req: Request, res: Response){
    const friends = await getAllFriends();
    res.json(friends)
}

export async function getUserFriends(req: Request, res: Response){
    const friends = await getAllUserFriends(req.params.id);
    res.status(200).json(friends);
}

export async function addFriend(req: Request, res: Response){
    const { id, f_id }: FriendSchema = req.body;
    if(!id || !f_id) return res.status(400).json({ error: "We lack one of the IDs"})
    const newFriend = await createFriend(id, f_id);
    res.status(201).json(newFriend);
}