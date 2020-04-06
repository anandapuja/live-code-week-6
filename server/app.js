require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const mainRoute = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', mainRoute);

app.listen(port, () => console.log('listening port: ', port));