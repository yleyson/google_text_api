const TextRouter = require('express').Router();

// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');
require('dotenv').config();

// Creates a client

const CONFIG = {
    credentials: {
        private_key: process.env.API_KEY,
        client_email: process.env.CLIENT_EMAIL
    }
}


const client = new vision.ImageAnnotatorClient(CONFIG);



TextRouter.post('/', async (req, res) => {
    console.log("key" + process.env.API_KEY)
    console.log("CLIENT_EMAIL" + process.env.CLIENT_EMAIL)

    const request = {
        image: {
            source: {
                imageUri: req.body.url
            }
        }
    };

    let text = ""

    await client
        .textDetection(request)
        .then(response => {
            let [result] = response
            text = result.fullTextAnnotation.text
            res.status(201).json(text);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err });
        });
});

module.exports = TextRouter;
