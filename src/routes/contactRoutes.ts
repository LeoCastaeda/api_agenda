import { Router } from 'express';
import { createContact, getContacts, updateContact, deleteContact, markAsFavorite, recoverContact } from '../controllers/contactController';

const router = Router();

router.post('/contacts', createContact);
router.delete('/contacts/:contactId', deleteContact);
router.put('/contacts/:contactId', updateContact);
router.patch('/contacts/:contactId/favorites', markAsFavorite);
router.patch('/contacts/:contactId/recover', recoverContact);
router.get('/contacts', getContacts);

export default router;
