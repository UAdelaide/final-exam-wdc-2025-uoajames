const express = require('express');
const session = require('express-session'); // To store login state
const path = require('path');
require('dotenv').config();

const app = express();

// To store user info, keeping them logged in
app.use(session({
    secret: 'DogWalkService',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dogs',

// Export the app instead of listening here
module.exports = app;