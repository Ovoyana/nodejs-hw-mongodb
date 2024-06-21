import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactsController,
  patchContactsController,
  deleteContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactsController),
);

router.patch('/contacts/:contactId', ctrlWrapper(patchContactsController));

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactsController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactsController),
);

export default router;
