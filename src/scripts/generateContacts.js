import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import fs from 'node:fs/promises';

const generateContacts = async (number) => {
     try {
        const contacts = await fs.readFile(PATH_DB, 'utf-8');
        const newContacts = Array.from({ length: number }, createFakeContact);
        const updatedContacts = [...JSON.parse(contacts), ...newContacts];

        await fs.writeFile(PATH_DB, JSON.stringify(updatedContacts, null, 2));
        console.log(`Generated ${number} new contacts and added them to the array.`);
    } catch (error) {
        console.error(`Error generating contacts: ${error.message}`);
    }
};

await generateContacts(5);
