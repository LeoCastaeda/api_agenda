"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const router = (0, express_1.Router)();
router.post('/contacts', contactController_1.createContact);
router.delete('/contacts/:contactId', contactController_1.deleteContact);
router.put('/contacts/:contactId', contactController_1.updateContact);
router.patch('/contacts/:contactId/favorites', contactController_1.markAsFavorite);
router.patch('/contacts/:contactId/recover', contactController_1.recoverContact);
router.get('/contacts', contactController_1.getContacts);
exports.default = router;
