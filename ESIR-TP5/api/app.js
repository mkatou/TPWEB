const express = require('express');
var cors = require('cors');

const bodyParser = require("body-parser")
const helmet = require('helmet')
const fs = require('fs')
const jwt = require("jsonwebtoken")


const app = express()

const mongoose = require('./database/mongoose')

const usersModel = require('./models/users')
const usersRouter = require('./routes/users-v1')

const loginModel = require('./models/idp')
const authRouter = require('./routes/auth-v1')


app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(bodyParser.json())
app.use(helmet({ noSniff: true }))

app.use("/v1/users", usersRouter(usersModel))
app.use("/v1/auth", authRouter(loginModel))

exports.app = app;