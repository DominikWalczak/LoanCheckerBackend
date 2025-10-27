import { getAllFriends, getAllUserFriends, createFriend } from "../models/friendModel.js";

export async function getFriends(req, res){
    try {
        const friends = await getAllFriends();
        res.json(friends)
    } catch (error) {
        console.log(`getAllFriends Error: ${error}`);
    }
}

export async function getUserFriends(req, res){
    try {
        const friends = await getAllUserFriends();
        res.json(friends);
    } catch (error) {
        console.log(`getUserFriends Error: ${error}`);
    }
}

export async function addFriend(req, res){
    const { id, f_id } = req.body;
    if(!id || !f_id) return res.status(400).json({ error: "We lack one of the IDs"})

    try {
        const newFriend = await createFriend();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(`getUserFriends Error: ${error}`);
    }
}