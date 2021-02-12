const express = require('express');
const path = require('path');

const controller = require('./controller');

const app = express();

// Path definition
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');

app.use(express.static(publicPath));

// Routes
app.get('/', (req, res) => { res.render('index'); }); // Render html page
app.get('/search/:address', controller.getPokeByAddress); // API route

module.exports = app;