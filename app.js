require("dotenv").config();
const mustacheExpress = ("mustache-express");
const express = require('express');
const logger = require('morgan');
const engine = mustacheExpress();
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger('dev'));
app.engine("mustache",engine);