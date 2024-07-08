import { getAllContacts, getContactById, createContact, updateContacts, deleteContacts } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res,next) => {
    try {
      const { page, perPage } = parsePaginationParams(req.query);

      const { sortBy, sortOrder } = parseSortParams(req.query);


      const filter = parseFilterParams(req.query);

      const userId = req.user._id;

      const contacts = await getAllContacts({
        userId,
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
      });
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch(err) {
		next(err);
	}
  };

  export const getContactByIdController = async (req, res, next) => {
try {
      const { contactId } = req.params;
      const userId = req.user._id;

      const contact = await getContactById({ contactId, userId });

      if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (err) {
      next(err);
    }

  };

  export const createContactsController = async (req, res, next) => {
    const { name, phoneNumber } = req.body;

  if (!name || !phoneNumber) {
    next(createHttpError(400, 'Name and phoneNumber are required'));
    return;
  }
  const userId = req.user._id;

  const newContact = await createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: newContact,
  });
  };

  export const patchContactsController = async (req, res, next) => {
   try{
    const { contactId } = req.params;

    const userId = req.user._id;

    const result = await updateContacts({ contactId, userId, payload: req.body });;

    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
      status: 200,
      message: `Successfully patched a student!`,
      data: result.contact,
    });
  } catch (err) {
    next(err);
  }
  };

  export const deleteContactsController = async (req, res, next) => {
    try {

    const { contactId } = req.params;

    const userId = req.user._id;

    const contact = await deleteContacts({ contactId, userId });

    if (!contact) {
      next(createHttpError(404, 'Contact not found' ));
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
  };
