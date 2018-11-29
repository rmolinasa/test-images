const express = require('express');
const app = express();

//IMPORTACIONES
app.use(require('./downloadImages'));


module.exports = app;