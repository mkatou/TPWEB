const Alert = require('../database/models/alert');

const get = async(id) => {
    let alert = await Alert.findOne({ _id: id }).exec();

    if (!alert) {
        throw new Error("not.found");
    }

    return alert.toJSON();
};

const getAll = async(id) => {
    let alert = await Alert.find({}).exec();

    if (!alert)
        throw new Error("not.found");

    return alert;

}


const add = async(alert) => {
    const newAlert = new Alert(alert);

    if (!newAlert) {
        throw new Error("invalid input");
    }

    await newAlert.save();

    return newAlert.toJSON();
};

const update = async(id, newAlertProperties) => {

    let oldAlert = await Alert.findOne({ _id: id }).exec();

    if (!oldAlert)
        throw new Error("not.found");

    await Alert.deleteOne({ _id: id });
    oldAlert = oldAlert.toJSON();

    let newAlert = {
        ...oldAlert,
        ...newAlertProperties
    }

    newAlert = Alert(newAlert);

    if (!newAlert)
        throw new Error("invalid.input")

    const res = await newAlert.save();

    return res;

}

const remove = async(id) => {
    const res = await Alert.deleteOne({ _id: id });

    if (res.ok != 1)
        throw new Error("an error occured");
    else if (res.deletedCount < 1)
        throw new Error("not.found");

    return res;
}

exports.get = get;
exports.getAll = getAll;
exports.add = add;
exports.update = update;
exports.remove = remove;