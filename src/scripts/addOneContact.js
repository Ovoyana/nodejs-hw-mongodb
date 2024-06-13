import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import fs from 'node:fs/promises';

export const addOneContact = async () => {
    try {
        const contacts = await fs.readFile(PATH_DB, 'utf-8');
        const newContact = createFakeContact();
        const updatedContacts = [...JSON.parse(contacts), newContact];

        await fs.writeFile(PATH_DB, JSON.stringify(updatedContacts, null, 2));

        console.log(`Generated new contact and added it to the file.`);
    } catch (error) {
        console.error(`Error generating contacts: ${error.message}`);
    }
};

await addOneContact();

