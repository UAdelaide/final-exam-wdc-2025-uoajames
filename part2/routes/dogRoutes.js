const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Route to return dogs as JSON
app.get('/api/dogs', async (req, res) => {
  try {
    const [rows] = await db.execute(`
        SELECT D.name AS dog_name, D.size, U.username AS owner_username
        FROM Dogs D
        JOIN Users U ON D.owner_id = U.user_id
        `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

router.get('/dogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT D.dog_id, D.name AS dog_name, D.size, U.user_id AS owner_id
      FROM Dogs D
      JOIN Users U ON D.owner_id = U.user_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;