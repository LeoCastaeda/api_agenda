import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const  { userId, name } = req.body;

    try { 
        const user = await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                name
            }            
        });
        res.status(200).json(user);
    } catch (error) {    
        res.status(500).json({ error: 'Error updating user' });
    }
}   

       

export const getUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
        res.status(200).json(user);
    } catch (error) {    
        res.status(500).json({ error: 'Error getting user' });
    }
}    

export const getUsers = async (req: Request, res: Response) => {    
    try {
        const users = await prisma.user.findMany();                 
        res.status(200).json(users);
    } catch (error) {    
        res.status(500).json({ error: 'Error getting users' });
    }
}           

export const deleteUser = async (req: Request, res: Response) => {    
    const { userId } = req.params; 
    const numericUserId = Number(userId);                                 

    try {
        const user = await prisma.user.delete({ where: { id:  numericUserId } });                     
        res.status(200).json(user);
    } catch (error) {    
        res.status(500).json({ error: 'Error deleting user' });
    }
}   
