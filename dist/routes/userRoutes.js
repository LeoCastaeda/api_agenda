"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Crear un nuevo usuario
router.post('/users', userController_1.createUser);
// Actualizar un usuario existente
router.put('/users/:userId', userController_1.updateUser);
// Obtener un usuario por su ID
router.get('/users/:userId', userController_1.getUser);
// Obtener todos los usuarios
router.get('/users', userController_1.getUsers);
// Eliminar un usuario por su ID
router.delete('/users/:userId', userController_1.deleteUser);
exports.default = router;
