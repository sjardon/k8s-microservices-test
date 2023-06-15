const express = require('express');
const cors = require('cors');
const api = require('./common/api');
require('./domain/candlesticks-streams/jobs/start-candlesticks-generator.job');

const app = express();

// set security HTTP headers
// app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());
// app.use(mongoSanitize());

// gzip compression
// app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/', api);

// handle error
// app.use(errorHandler);

module.exports = app;