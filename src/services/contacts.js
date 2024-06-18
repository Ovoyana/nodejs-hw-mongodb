import { ContactsList } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsList.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsList.findById(contactId);
  return contact;
};
