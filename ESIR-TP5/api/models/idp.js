const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const saltRounds = config.get("saltRounds");
const privateKey = config.get("privateKey");

const User = require('../database/models/user');

const login = async(_login, _password) => {

    const user = await User.findOne({ login: _login }).exec();

    if (user) {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(_password, saltRounds, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        })

        const match = await bcrypt.compare(_password, user.password);

        if (match) {
            const token = await new Promise((resolve, reject) => {

                let exp = Math.floor(Date.now() / 1000) + (60 * 60)
                jwt.sign({
                    exp,
                    _login
                }, privateKey, (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                });
            })
            return token
        } else {
            throw new Error('invalid.password');
        }
    } else {
        throw new Error('invalid.login');
    }
}

exports.login = login;