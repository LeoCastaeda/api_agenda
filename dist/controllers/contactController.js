"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverContact = exports.markAsFavorite = exports.deleteContact = exports.updateContact = exports.getContact = exports.getContacts = exports.createContact = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, firstName, lastName, email, phone } = req.body;
    try {
        const userExists = yield exports.prisma.user.findUnique({
            where: { id: userId },
        });
        const contact = yield exports.prisma.contact.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                userId,
            },
        });
        res.status(201).send(contact);
    }
    catch (error) {
        res.status(400).send('Contact could not be created');
    }
});
exports.createContact = createContact;
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield exports.prisma.contact.findMany({
            where: {
                isDeleted: false
            },
            orderBy: {
                firstName: 'asc'
            }
        });
        res.status(200).send(contacts);
    }
    catch (error) {
        res.status(404).send('Contacts could not be found');
    }
});
exports.getContacts = getContacts;
const getContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    try {
        const contact = yield exports.prisma.contact.findFirst({
            where: {
                id: Number(contactId),
            }
        });
        res.status(200).send(contact);
    }
    catch (error) {
        res.status(404).send('Contact could not be found');
    }
});
exports.getContact = getContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    try {
        const contact = yield exports.prisma.contact.update({
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
        res.status(200).send(contact);
    }
    catch (error) {
        res.status(400).send('Contact could not be updated');
    }
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    try {
        const contact = yield exports.prisma.contact.update({
            where: {
                id: Number(contactId),
            },
            data: {
                isDeleted: true,
            },
        });
        res.status(200).send(contact);
    }
    catch (error) {
        res.status(400).send('Contact could not be deleted');
    }
});
exports.deleteContact = deleteContact;
const markAsFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    try {
        try {
            const contact = yield exports.prisma.contact.update({
                where: {
                    id: Number(contactId),
                    isFavorite: false
                },
                data: {
                    isFavorite: true,
                },
            });
            res.status(200).send(contact);
        }
        catch (_a) {
            const contact = yield exports.prisma.contact.update({
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
    }
    catch (error) {
        res.status(400).send('Error updating contact');
    }
});
exports.markAsFavorite = markAsFavorite;
const recoverContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    try {
        const contact = yield exports.prisma.contact.update({
            where: {
                id: Number(contactId),
            },
            data: {
                isDeleted: false,
            },
        });
        res.status(200).send(contact);
    }
    catch (error) {
        res.status(400).send('Contact could not be restored');
    }
});
exports.recoverContact = recoverContact;
