import { Router } from 'express';
import { createUser, updateUser} from '../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.patch('/users/:userId', updateUser);

export default router;
