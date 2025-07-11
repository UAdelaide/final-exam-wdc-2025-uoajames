const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Changed email to username
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    req.session.user = user;

    // Redirect user to designated dashboard
    if (user.role == 'owner') {
      return res.redirect(302, '/owner-dashboard.html');
    } else {
      return res.redirect(302, '/walker-dashboard.html');
    }
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Sesssion destroy error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }

    // Clear cookies
    res.clearCookie('connect.sid');
    return res.json({ message: 'Logout successful' });
  });
});

// GET dogs of owner
router.get('/ownedDogs', async (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ error: 'Not logged in' });
  if (user.role !== 'owner' ) return res.status(403).json({ error: 'Forbidden' });

  // Match dog to owners
  try {
    const[rows] = await db.query(`
      SELECT dog_id, name FROM Dogs WHERE owner_id = ?`,
      [user.user_id]
  );
  res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load dogs '});
  }
});

module.exports = router;