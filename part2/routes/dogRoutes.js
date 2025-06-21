const express = require('express');
const router = express.Router();
const { Dog } = require('./models');

router.get('/dogs', async (req, res) => {
    try {
        const dogs = await Dog.find();

        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const randomImage = data.message;

        res.json({ dogs, randomImage });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dog image' });
    }
});

module.exports = router;