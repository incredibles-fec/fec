// This module adds environment variables to
// process.env, based on values in ../.env.
// See that file for configurable values.
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

// MiddleWare
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
