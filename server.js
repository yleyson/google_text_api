
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//port
const PORT = process.env.PORT || 5008;
const bodyParser = require('body-parser')
//create server
const server = express();
server.use(express.json()); //enable json support
server.use(cors()); //enable global access
server.use(helmet()); //more defense

server.use(bodyParser.json({
    limit: '50mb'
}));

server.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

server.use('/api/google_text', require('./controllers/api_controller'));


server.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
});




