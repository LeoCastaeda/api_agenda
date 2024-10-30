import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { userModel } from '../models/user';

export const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {

    try {
        const user = await userModel.createUser(req, res)

        res.status(201).json(user);
    } catch (error) {
        res.status(422).json({ error: 'Error creating user' });

    }
};

export const updateUser = async (req: Request, res: Response) => {

    try {
        const userFound = await userModel.getUser(req, res)
        if (!userFound) throw 'No user'
        const user = await userModel.updateUser(req, res)
        if (!user) throw 'No update'
        res.status(200).json(user);
    } catch (error) {
        if (error = 'No user') res.status(404).json({ error: 'Error getting user' })
        else if (error = 'No update') res.status(400).json({ error: 'Error updating user' })
    }
}



export const getUser = async (req: Request, res: Response) => {

    try {
        const user = await userModel.getUser(req, res)
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: 'Error getting user' });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.getUsers(req, res)
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ error: 'Error getting users' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {

    try {
        const user = await userModel.deleteUser(req, res)
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error deleting user' });
    }
}   
