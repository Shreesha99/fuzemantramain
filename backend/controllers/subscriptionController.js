const Subscription = require('../models/subscriptionModel');

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *       example:
 *         email: user@example.com
 */

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     summary: Subscribe to newsletter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: Email subscribed successfully.
 *       400:
 *         description: Email already subscribed.
 *       500:
 *         description: Failed to subscribe email.
 */
exports.subscribeEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email });

    if (existingSubscription) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Create new subscription
    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    res.status(201).json({ message: 'Email subscribed successfully' });
  } catch (err) {
    console.error('Error subscribing email:', err);
    res.status(500).json({ message: 'Failed to subscribe email' });
  }
};
