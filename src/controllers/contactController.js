const Contact = require('../models/contact');

class ContactController {
  async createContactMessage(req, res) {
    try {
      const message = await Contact.create(req.body);
      res.status(201).json(message);
    } catch (error) {
      console.error('Error creating contact message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllContactMessages(req, res) {
    try {
      const messages = await Contact.findAll();
      res.json(messages);
    } catch (error) {
      console.error('Error getting messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ContactController;