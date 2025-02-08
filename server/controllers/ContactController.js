const Contact = require("../models/Contact");

const createContact = async (req, res) => {
    const { name, message } = req.body;
    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    if (message.length > 1000) {
        return res.status(400).json({ message: "Message is too long" });
    }

    try {
        const newContact = await Contact.create({
            name,
            message
        });
        res.status(201).json({
            message: "Contact created successfully",
            Contact: {
                id: newContact._id,
                name: newContact.name,
                message: newContact.message
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ contacts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Contact ID is required" });
    }
    try {
        const contact = await Contact.findOneAndDelete({ _id: id });
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = {
    createContact,
    getContacts,
    deleteContact
};