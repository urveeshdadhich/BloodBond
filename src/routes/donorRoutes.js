const express = require('express');
const DonorController = require('../controllers/donorController');

const router = express.Router();
const donorController = new DonorController();

router.post('/', donorController.createDonor);
router.get('/', donorController.getAllDonors);

module.exports = router;