import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { contactModel } from '../models/contact';

export const prisma = new PrismaClient();

export const createContact = async (req: Request, res: Response) => {
    try {
        const contact = await contactModel.createContact(req, res)
        res.status(201).send(contact);
    } catch (error) {
        res.status(400).send('Contact could not be created');
    }
};

export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await contactModel.getContacts(req, res)
        res.status(200).send(contacts);
    } catch (error) {
        res.status(404).send('Contacts could not be found');
    }
};
export const getContact = async (req: Request, res: Response) => {
    try {
        const contact = await contactModel.getContact(req, res)
        res.status(200).send(contact);
    } catch (error) {
        res.status(404).send('Contact could not be found');
    }
};

export const updateContact = async (req: Request, res: Response) => {

    try {
        const contactFound = await contactModel.getContact(req, res)
        if (!contactFound) throw 'No contact'
        const contact = await contactModel.updateContact(req, res)
        if (!contact) throw 'No update'
        res.status(200).send(contact);
    } catch (error) {
        if (error = 'No contact') res.status(404).send('Contact could not be found');
        else if (error = 'No update') res.status(400).send('Contact could not be updated');
    }
};

export const deleteContact = async (req: Request, res: Response) => {

    try {
        const contact = await contactModel.deleteContact(req, res)
        res.status(200).send(contact);
    } catch (error) {
        res.status(400).send('Contact could not be deleted');
    }
}

export const markAsFavorite = async (req: Request, res: Response) => {
    try {
        try {
            const contact = await contactModel.favorite(req, res)
            res.status(200).send(contact);
        } catch {
            const contact = await contactModel.unfavourite(req, res)
            res.status(200).send(contact);
        }
    } catch (error) {
        res.status(400).send('Error updating contact');
    }
};


export const recoverContact = async (req: Request, res: Response) => {

    try {
        const contact = await contactModel.recoverContact(req, res)
        res.status(200).send(contact);
    } catch (error) {
        res.status(400).send('Contact could not be restored');
    }
};