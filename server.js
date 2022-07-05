
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

//port
const PORT = process.env.PORT || 5008;

//create server
const server = express();
server.use(express.json()); //enable json support
server.use(cors()); //enable global access
server.use(helmet()); //more defense

// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

// Creates a client

const CONFIG = {
    credentials: {
        private_key: process.env.API_KEY,
        client_email: process.env.CLIENT_EMAIL
    }
}


const client = new vision.ImageAnnotatorClient(CONFIG);



server.post('/', async (req, res) => {

    const request = {
        image: {
            content: req.body.text
        }
    };

    let text = ""

    await client
        .textDetection(request)
        .then(response => {
            let [result] = response
            text = result.fullTextAnnotation.text
        })
        .catch(err => {
            console.log(err)
        });
    res.end(text)

});

server.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
});




