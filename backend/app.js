const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');



mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // Permet d'interpréter le JSON dans req.body

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
    });

app.use('/api/stuff', stuffRoutes);

module.exports = app;