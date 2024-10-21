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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const contactController_1 = require("../controllers/contactController");
describe('User API', () => {
    let userId;
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        if (userId) {
            yield (0, supertest_1.default)(server_1.default).delete(`/users/${userId}`);
        }
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post('/users')
            .send({ name: 'John Doe' });
        expect(res.statusCode).toEqual(201);
        userId = res.body.id;
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('John Doe');
    }));
    it('should return 500 if name is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post('/users')
            .send({});
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('error');
    }));
    it('should update user name', () => __awaiter(void 0, void 0, void 0, function* () {
        const createRes = yield (0, supertest_1.default)(server_1.default)
            .post('/users')
            .send({ name: 'Old Name' });
        const userId = createRes.body.id;
        const res = yield (0, supertest_1.default)(server_1.default)
            .put(`/users/${userId}`)
            .send({
            userId: userId,
            name: 'Updated Name',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Updated Name');
    }));
    it('should return 404 if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .patch('/users/9999')
            .send({ name: 'New Name' });
        expect(res.statusCode).toEqual(404);
    }));
});
describe('Contact API', () => {
    let userId;
    let contactId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userRes = yield contactController_1.prisma.user.create({
            data: { name: 'Test User' },
        });
        userId = userRes.id;
        const contact = yield contactController_1.prisma.contact.create({
            data: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '1234567890',
                userId,
            },
        });
        contactId = contact.id;
    }));
    it('should create a new contact for a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const contactRes = yield (0, supertest_1.default)(server_1.default)
            .post('/contacts')
            .send({
            userId,
            firstName: 'Ja',
            lastName: 'Smit',
            email: 'jasmith@ex.com',
            phone: '123456789',
        });
        expect(contactRes.statusCode).toEqual(201);
        expect(contactRes.body).toHaveProperty('id');
    }));
    it('should get user contacts in alphabetical order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield contactController_1.prisma.contact.createMany({
            data: [
                { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@exampl.com', phone: '1111', userId },
                { firstName: 'Alice', lastName: 'Wonderland', email: 'alice@exampl.com', phone: '2222', userId },
            ],
        });
        const res = yield (0, supertest_1.default)(server_1.default).get('/contacts').send();
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].firstName).toBe('Alice');
        expect(res.body[1].firstName).toBe('Charlie');
    }));
    it('should mark a contact as favorite', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).patch(`/contacts/${contactId}/favorites`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.isFavorite).toBe(true);
    }));
    it('should delete a contact', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).delete(`/contacts/${contactId}`);
        expect(res.statusCode).toEqual(200);
    }));
    it('should recover a deleted contact', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).patch(`/contacts/${contactId}/recover`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('isDeleted', false);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield contactController_1.prisma.contact.deleteMany({});
    yield contactController_1.prisma.user.deleteMany({});
    yield contactController_1.prisma.$disconnect();
}));
