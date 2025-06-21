const express = require('express');
const router = express.Router();
const { Dog } = require('./models');

router.get('/dogs', async (req, res) => {
    try {
        const dogs = await Dog.find();
    }

    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    const randomImage = 
})

module.exports = router;