const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Route to return dogs as JSON
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(`
        SELECT D.dog_id, D.name AS dog_name, D.size, U.user_id AS owner_id
        FROM Dogs D
        JOIN Users U ON D.owner_id = U.user_id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching dogs: ', err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;