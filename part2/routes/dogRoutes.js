const express = require('express');
const router = express.Router();
const db = require('../models/d')

router.get('/dogs', async (req, res) => {
    try {
        const [rows] = await d
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dog image' });
    }
});

module.exports = router;