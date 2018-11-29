// REQUIRES
require('./config/config');
const express = require('express');
const cors = require('cors')
const xmldom = require('xmldom');
const imgDownloader = require('image-downloader');
//
const app = express();
app.use(express.static(__dirname + '/public'));

//IMPORTACIONES
app.use(require('./routes/index'));

//CORS
app.use(cors());


// SERVIDOR
app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto --> " + process.env.PORT);
});