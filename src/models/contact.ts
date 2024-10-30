import { prisma } from '../controllers/contactController';
import { Request, Response } from 'express'

export class contactModel {
    static async createContact(req: Request, res: Response) {
        const { userId, firstName, lastName, email, phone } = req.body;
        const userExists = await prisma.user.findUnique({
            where: { id: userId },
        });

        const contact = await prisma.contact.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                userId,
            },
        });
        return contact
    }
    static async getContacts(req: Request, res: Response) {
        const contacts = await prisma.contact.findMany({
            where: {
                isDeleted: false
            },
            orderBy: {
                firstName: 'asc'
            }
        });
        return contacts
    }
    static async getContact(req: Request, res: Response) {
        const { contactId } = req.params;
        const contact = await prisma.contact.findFirst({
            where: {
                id: Number(contactId),
            }
        });
        return contact
    }
    static async updateContact(req: Request, res: Response) {
        const { contactId } = req.params;
        const { firstName, lastName, email, phone } = req.body;
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
        return contact
    }
    static async deleteContact(req: Request, res: Response) {
        const { contactId } = req.params;
        const contact = await prisma.contact.update({
            where: {
                id: Number(contactId),
            },
            data: {
                isDeleted: true,
            },
        });
        return contact
    }
    static async favorite(req: Request, res: Response) {
        const { contactId } = req.params;
        const contact = await prisma.contact.update({
            where: {
                id: Number(contactId),
                isFavorite: false
            },
            data: {
                isFavorite: true,
            },
        });
        return contact
    }
    static async unfavourite(req: Request, res: Response) {
        const { contactId } = req.params;
        const contact = await prisma.contact.update({
            where: {
                id: Number(contactId),
                isFavorite: true
            },
            data: {
                isFavorite: false,
            },
        });
        return contact
    }
    static async recoverContact(req: Request, res: Response) {
        const { contactId } = req.params;
        const contact = await prisma.contact.update({
            where: {
                id: Number(contactId),
            },
            data: {
                isDeleted: false,
            },
        });
        return contact
    }
}