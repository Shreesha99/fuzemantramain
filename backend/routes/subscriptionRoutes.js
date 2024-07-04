const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Route to handle newsletter subscription form submission
router.post('/subscribe', subscriptionController.subscribeEmail);

module.exports = router;
