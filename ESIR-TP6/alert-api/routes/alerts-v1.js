const express = require('express');

const router = express.Router();

let alertModel = undefined;

router.use((req, res, next) => {
    if (!alertModel) {
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
        const alert = await alertModel.get(id)
        res
            .status(200)
            .json(alert)
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
    const alert = {
        type: req.body.type,
        label: req.body.label,
        status: req.body.status,
        from: req.body.from,
        to: req.body.to
    }

    try {
        const addedAlert = await alertModel.add(alert)

        res
            .status(201)
            .json(addedAlert)

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
        const alert = await alertModel.getAll()
        res
            .status(200)
            .json(alert)
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
        let rm = await alertModel.remove(id);
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

    const newAlertProperties = req.body

    const expectedFields = ["type", "label", "status", "from", "to"]

    Object.keys(newAlertProperties).forEach(element => {
        console.log(element)
        if (!expectedFields.includes(element)) {
            res
                .status(405)
                .json({ "message": "wrong parameter" })
            return;
        }
    });

    if (!id && !newAlertProperties) {
        res
            .status(405)
            .json({ "message": "wrong parameter" })
        return;
    }

    try {

        const newAlert = await alertModel.update(id, newAlertProperties);
        res
            .status(200)
            .json(newAlert)
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
    alertModel = model
    return router
};