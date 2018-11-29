//==========================================
//                REQUIRES
//==========================================
const express = require('express');
const cors = require('cors');
const app = express();
const https = require('https');
const DOMParser = require('xmldom').DOMParser;
const download = require('image-downloader');
//==========================================

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/downloadImages', (req, res) => {

    let url = "https://www.zara.com/es/es/hombre-jeans-skinny-l673.html?v1=1079308";
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log('Web recibida');
            var regExp = new RegExp("{\"id\":[0-9]+,\"type\":\"Product\",\"kind\":\"[a-zA-Z]*\",\"sequence\":[0-9]*,\"image\":{\"name\":\"[0-9]*(_[0-9]+)*\",\"path\":\"(/[a-zA-Z0-9]+)+/\",\"timestamp\":\"[0-9]+\"}", "g");
            var imagenesData = data.match(regExp);
            var arrayUrl = [];
            for (var i = 0; i < imagenesData.length; i++) {
                console.log(imagenesData[i]);
                var json = JSON.parse(`${imagenesData[i]}}`);
                url = `https://static.zara.net/photos//${json.image.path}w/400/${json.image.name}_1.jpg?ts=${json.image.timestamp}`;
                arrayUrl.push(url);
                downloadImage(url, json.image.name);
            }
            return res.status(200).json({
                url: url,
                imagenes: JSON.stringify(arrayUrl)
            });
        });
    }).on("error", (err) => {
        console.log('Error:' + JSON.stringify(err));
    });
});

function downloadImage(url, imageName) {
    const options = {
        url: url,
        dest: 'public/front/src/static/' + imageName + ".jpg"
    }
    download.image(options)
        .then(({ filename, image }) => {
            console.log('Imagen guardada en ', filename)
        })
        .catch((err) => {
            console.error(err)
        })
}

module.exports = app;