const express = require('express');
const Router = express.Router();
const {
    createContact,
    getContacts,
    deleteContact
} = require('../controllers/ContactController');

Router.post('/create', createContact);
Router.get('/contacts', getContacts);
Router.delete('/contact/:id', deleteContact);

module.exports = Router;