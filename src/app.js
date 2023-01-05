const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const accessControlAllow = require('./middlewares/accessControlAllow');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(accessControlAllow);
app.use(express.static(`${__dirname}/../public`))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

module.exports = app;