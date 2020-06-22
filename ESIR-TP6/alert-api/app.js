const express = require('express');
var cors = require('cors');

const bodyParser = require("body-parser")
const helmet = require('helmet')
const fs = require('fs')
const jwt = require("jsonwebtoken")


const app = express()

const mongoose = require('./database/mongoose')

const alertModel = require('./models/alerts')
const alertRouter = require('./routes/alerts-v1')

const loggerModel = require("./models/idp")



app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


app.use(bodyParser.json())
app.use(helmet({ noSniff: true }))

app.use("/v1/alerts", alertRouter(alertModel))

exports.app = app;