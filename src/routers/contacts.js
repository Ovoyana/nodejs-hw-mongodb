import { Router } from 'express';
import { getContactsController, getContactByIdController, createContactsController, patchContactsController, deleteContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js'
const router = Router ();

router.get('/contacts', ctrlWrapper(getContactsController));

  router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));

  router.post('/contacts', ctrlWrapper(createContactsController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactsController))

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactsController))

  export default router;
