import { getAllFriends, getAllUserFriends, createFriend, createFriendRequest, denyFriendRequest, getFriendRequests } from "../models/friendModel";
import { Request, Response } from "express";
import z from "zod";

const addFriendSchema = z.object({
    id: z.string("Recieved data wasn't a text").min(1,"Id must have a value").optional(),
    f_id: z.string("Recieved data wasn't a text").min(1,"Id must have a value").optional(),
    request_id: z.string("Recieved data wasn't a text").min(1,"Id must have a value").optional(),
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
        console.log(10);
        const { id, f_id }: FriendSchema = req.body;
        console.log(req.body);
        console.log(id);
        console.log(f_id);
        console.log(11);
        if(!id || !f_id) return res.status(400).json({ error: "We lack one of the IDs"})
        console.log(12);
        const newFriend = await createFriendRequest(id, f_id);
        console.log(15);
        console.log(newFriend);
        res.status(201);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
        res.status(500).json({ 
            message: "addFriend error",
            error: error,
         });
    }
}
export async function acceptFriend(req: Request, res: Response) {
        try {
        console.log(10);
        const { id, f_id, request_id }: FriendSchema = req.body;
        console.log(req.body);
        console.log(id);
        console.log(f_id);
        console.log(11);
        if(!id || !f_id || !request_id) return res.status(400).json({ error: "We lack one of the IDs"})
        console.log(12);
        const newFriend = await createFriend(id, f_id, request_id);
        console.log(15);
        console.log(newFriend);
        res.status(201);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
        res.status(500).json({ 
            message: "addFriend error",
            error: error,
         });
    }
}

export async function denyFriend(req: Request, res: Response) {
        try {
        console.log(10);
        const { request_id }: FriendSchema = req.body;
        console.log(req.body);
        console.log(11);
        if(!request_id) return res.status(400).json({ error: "We lack one of the IDs"})
        console.log(12);
        const newFriend = await denyFriendRequest(request_id);
        console.log(15);
        console.log(newFriend);
        res.status(201);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
        res.status(500).json({ 
            message: "addFriend error",
            error: error,
         });
    }
}

export async function getRequests(req: Request, res: Response) {
    try {
        console.log(10);
        const { id }: FriendSchema = req.body;
        console.log(req.body);
        console.log(11);
        if(!id) return res.status(400).json({ error: "We lack one of the IDs"})
        console.log(12);
        const Requests = await getFriendRequests(id);
        console.log(15);
        console.log(Requests);
        res.status(201).json(Requests);
    } catch (error) {
        console.log(`getUsers Error: ${error}`);
        res.status(500).json({ 
            message: "addFriend error",
            error: error,
         });
    }

} // Tu zakończyłem