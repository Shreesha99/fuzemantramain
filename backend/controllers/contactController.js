const Contact = require('../models/Contact');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - subject
 *         - message
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         subject:
 *           type: string
 *         message:
 *           type: string
 */

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
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
};

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
exports.submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.json({ success: true, message: 'Contact form submitted successfully' });
  } catch (err) {
    console.error('Failed to submit contact form:', err);
    res.status(500).json({ success: false, message: 'Failed to submit contact form' });
  }
};
