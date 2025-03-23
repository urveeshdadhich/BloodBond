const express = require('express');
const ContactController = require('../controllers/contactController');

const router = express.Router();
const contactController = new ContactController();

router.post('/', contactController.createContactMessage);
router.get('/', contactController.getAllContactMessages);

module.exports = router;