const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contacts.
 *     responses:
 *       200:
 *         description: A list of contacts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Failed to retrieve contacts.
 */
router.get('/contact', contactController.getAllContacts);

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a contact form.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact form submitted successfully.
 *       500:
 *         description: Failed to submit contact form.
 */
router.post('/contact', contactController.submitContactForm);

module.exports = router;
