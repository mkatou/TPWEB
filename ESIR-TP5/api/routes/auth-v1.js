const express = require('express');
const router = express.Router();


let idpModel = undefined;

router.use((req, res, next) => {
    if (!idpModel) {
        res
            .status(500)
            .json({ message: 'model not initialised' });
    }
    next();
});

router.post('/', async(req, res) => {
    const { login, password } = req.body;

    if (login && password) {
        try {
            const token = await idpModel.login(login, password);
            res
                .status(200)

            .json({
                mesage: 'OK',
                access_token: token
            })
        } catch (err) {
            res
                .status(400)
                .json({
                    code: 0,
                    type: 'string',
                    message: err.message
                });
        }
    } else {
        res
            .status(400)
            .json({
                code: 0,
                type: 'string',
                message: 'login or password missing'
            })
    }
});

module.exports = (idpM) => {
    idpModel = idpM
    return router
};