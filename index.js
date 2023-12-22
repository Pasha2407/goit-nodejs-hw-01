const { program } = require("commander");
const Contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await Contacts.listContacts();
            return console.table(contacts);
        case "get":
            const contact = await Contacts.getContactById(id);
            return console.log(contact);
        case "add":
            const newContact = await Contacts.addContact({ name, email, phone });
            return console.log(newContact);
        case "remove":
            const removedContact = await Contacts.removeContact(id);
            return console.log(removedContact);
        default:
            console.log("Unknown action");
    }
}

program
    .option("--action <action>", "choose action")
    .option("--id <id>", "user id")
    .option("--name <name>", "user name")
    .option("--email <email>", "user email")
    .option("--phone <phone>", "user phone");

program.parse(process.argv);
const options = program.opts();
invokeAction(options);