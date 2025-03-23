const Donor = require('../models/donor');

class DonorController {
  async createDonor(req, res) {
    try {
      const donor = await Donor.create(req.body);
      res.status(201).json(donor);
    } catch (error) {
      console.error('Error creating donor:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllDonors(req, res) {
    try {
      const donors = await Donor.findAll();
      res.json(donors);
    } catch (error) {
      console.error('Error getting donors:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = DonorController;