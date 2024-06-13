import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';



export const removeLastContact = async () => {
    try {
        const contacts = await fs.readFile(PATH_DB, 'utf-8');
        const arrayContacts = JSON.parse(contacts);

if (arrayContacts.length > 0) {

    arrayContacts.pop();

        await fs.writeFile(PATH_DB, JSON.stringify(arrayContacts, null, 2));
        console.log("Last contact deleted successfully!");
    } else {
            console.log('The contact array is empty.');
          }

} catch (error) {
        console.error(`Error executing Thanos: ${error.message}`);
}
    }



await removeLastContact();


