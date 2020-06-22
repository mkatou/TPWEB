const express = require('express');

const router = express.Router();

let usersModel = undefined;

router.use((req, res, next) => {
    if (!usersModel) {
        res
            .status(500)
            .json({
                "message": "model not initialised"
            })
    }
    next()
});

router.get('/:id', async(req, res, next) => {

    const id = req.params.id

    if (!id) {
        res
            .status(400)
            .json({ "message": "wrong parameter" })
        return;
    }

    try {
        const user = await usersModel.get(id)
        res
            .status(200)
            .json(user)
    } catch (err) {
        if (err.message == "not.found") {
            res
                .status(404)
                .json({
                    "code": 0,
                    "type": "string",
                    "message": err.message
                })
        } else {
            res
                .status(405)
                .json({
                    "code": 0,
                    "type": "string",
                    "message": err.message
                })
        }
    }

});

router.post('/', async(req, res) => {
    const user = {
        name: req.body.name,
        login: req.body.login,
        age: req.body.age,
        password: req.body.password
    }

    try {
        const addedUser = await usersModel.add(user)

        res
            .status(201)
            .json(addedUser)

    } catch (err) {
        res
            .status(405)
            .json({
                "code": 0,
                "type": "string",
                "message": err.message
            })
    }
});

router.get('/', async(req, res, next) => {
    try {
        const user = await usersModel.getAll()
        res
            .status(200)
            .json(user)
    } catch (err) {
        if (err.message == "not.found") {
            res
                .status(404)
                .json({
                    "code": 0,
                    "type": "string",
                    "message": err.message
                })
        } else {
            res
                .status(405)
                .json({
                    "code": 0,
                    "type": "string",
                    "message": err.message
                })
        }
    }

});

router.delete('/:id', async(req, res, next) => {
    const id = req.params.id;

    if (!id) {
        res
            .status(400)
            .json({ "message": "wrong parameter" });
        return;
    }

    try {
        let rm = await usersModel.remove(id);
        res
            .status(200)
            .json({ "message": rm })
    } catch (err) {
        if (err.message == "not.found") {
            res
                .status(404)
                .json({
                    "code": 0,
                    "type": "string",
                    "message": err.message
                })
        } else {
            res
                .status(405)
                .json({
                    "code": 0,
                    "type": "string",
                    "message": err.message
                })
        }
    }
});

router.put('/:id', async(req, res, next) => {
    const id = req.params.id;

    const newUserProperties = req.body

    const expectedFields = ["name", "login", "age", "password"]

    Object.keys(newUserProperties).forEach(element => {
        console.log(element)
        if (!expectedFields.includes(element)) {
            res
                .status(405)
                .json({ "message": "wrong parameter" })
            return;
        }
    });

    if (!id && !newUserProperties) {
        res
            .status(405)
            .json({ "message": "wrong parameter" })
        return;
    }

    try {

        const newUser = await usersModel.update(id, newUserProperties);
        res
            .status(200)
            .json(newUser)
    } catch (err) {
        if (err.message == "not.found") {
            res
                .status(404)
                .json({
                    "code": 0,
                    "type": "string",
                    "message": err.message
                })
        } else {
            res
                .status(405)
                .json({
                    "code": 0,
                    "type": "string",
                    "message": err.message
                })
        }
    }

});

module.exports = (model) => {
    usersModel = model
    return router
};