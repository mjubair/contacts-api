import { Router } from 'express';
import * as contactsController from '../controllers/contacts.controller.js';

const router = Router();

router.get('/', contactsController.list);
router.post('/', contactsController.create);
router.put('/:id', contactsController.update);
router.delete('/:id', contactsController.remove);

export default router;
