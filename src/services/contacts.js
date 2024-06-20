import { ContactsList } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsList.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsList.findById(contactId);
  return contact;
};

export const createContact= async (payload) => {
  const contact = await ContactsList.create(payload);
  return contact;
};

export const updateContacts = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsList.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContacts = async (contactId) => {
  const contact = await ContactsList.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
