import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createContact = async (req: Request, res: Response) => {
    const { userId, firstName, lastName, email, phone } = req.body;

    try {
        const contact = await prisma.contact.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                userId,
            },
        });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Error creating contact' });
    }
};

export const getContacts = async (req: Request, res: Response) => {
    try {                   
        const contacts = await prisma.contact.findMany({
            where: {
                userId: Number(req.params.userId),
            },
        });
        res.status(200).json(contacts); 
    } catch (error) {
        res.status(500).json({ error: 'Error getting contacts' });      
    }
};    

export const updateContact = async (req: Request, res: Response) => {           
    const { contactId } = req.params;
    const { firstName, lastName, email, phone } = req.body; 

    try {    
        const contact = await prisma.contact.update({
            where: {
                id: Number(contactId),
            },
            data: {
                firstName,
                lastName,
                email,
                phone,
            },
        });
        res.status(200).json(contact);  
    } catch (error) {   
        res.status(500).json({ error: 'Error updating contact' });              
    }
};  

export const deleteContact = async (req: Request, res: Response) => {   
    const { contactId } = req.params;   

    try {
        const contact = await prisma.contact.delete({
            where: {
                id: Number(contactId),  
            },
        });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting contact' });
    }   
}   

export const markAsFavorite = async (req: Request, res: Response) => {
    const { contactId } = req.params;   
    try {
        try {
            const contact = await prisma.contact.update({
                where: {
                    id: Number(contactId),
                    isFavorite: false
                },
                data: {
                    isFavorite: true,
                },
            });
            res.status(200).send(contact); 
        } catch {
            const contact = await prisma.contact.update({
                where: {
                    id: Number(contactId),
                    isFavorite: true
                },
                data: {
                    isFavorite: false,
                },
            });
            res.status(200).send(contact); 
        }           
    } catch (error) {
        res.status(400).send('Error updating contact');                  
    }
};

export const recoverContact = async (req: Request, res: Response) => {
    const { contactId } = req.params;   

    try {           
        const contact = await prisma.contact.update({
            where: {
                id: Number(contactId),
            },
            data: {
                isFavorite: false,
            },
        });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Error updating contact' });                  
    }   
};
export const getContact = async (req: Request, res: Response) => {
    const { contactId } = req.params;
    try {                   
        const contact = await prisma.contact.findFirst({
          where: {
            id: Number(contactId),
          } 
        });
        res.status(200).send(contact); 
    } catch (error) {
        res.status(404).send('Contact could not be found');      
    }
};


