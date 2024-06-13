import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const removeAllContacts = async () => {

    try {
        await fs.writeFile(PATH_DB, '[]');
        console.log("Contacts deleted successfully!");
    } catch {
        console.log("Error deleting contacts!");
    }
};

await removeAllContacts();
