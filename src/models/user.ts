import { prisma } from '../controllers/userController';
import { Request, Response } from 'express'

export class userModel {
    static async createUser(req: Request, res: Response) {
        const { name } = req.body;
        const user = await prisma.user.create({
            data: {
                name,
            },
        });
        return user
    }
    static async updateUser(req: Request, res: Response) {
        const { userId, name } = req.body;
        const user = await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                name
            }
        });
        return user
    }
    static async getUser(req: Request, res: Response) {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
        return user
    }
    static async getUsers(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        return users
    }
    static async deleteUser(req: Request, res: Response) {
        const { userId } = req.params;
        const numericUserId = Number(userId);
        const user = await prisma.user.delete({ where: { id: numericUserId } });
        return user
    }
}