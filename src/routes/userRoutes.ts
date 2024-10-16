import { Router } from 'express';
import {
    createUser,
    updateUser,
    getUser,
    getUsers,
    deleteUser,
} from '../controllers/userController';

const router = Router();

// Crear un nuevo usuario
router.post('/users', createUser);

// Actualizar un usuario existente
router.put('/users/:userId', updateUser);

// Obtener un usuario por su ID
router.get('/users/:userId', getUser);

// Obtener todos los usuarios
router.get('/users', getUsers);

// Eliminar un usuario por su ID
router.delete('/users/:userId', deleteUser);

export default router;
