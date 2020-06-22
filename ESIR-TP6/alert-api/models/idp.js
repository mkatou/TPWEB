const jwt = require("jsonwebtoken")
const fs = require("fs")
const config = require('config')
const privateKey = config.get("privateKey");
const axios = require("axios")


const verifyacess = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                reject()
            } else {
                resolve(decoded)
            }
        })
    })
}





module.exports = { verifyacess }