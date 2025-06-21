const express = require('express');
const router = express.Router();
const dogs = require('./models');

router.get('/dogs', async (req, res) => {
    try {
        const dogs = await Dog.find();
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dog image' });
    }
});

module.exports = router;