const User = require('../database/models/user');

const get = async(id) => {
    let user = await User.findOne({ _id: id }).exec();

    if (!user) {
        throw new Error("not.found");
    }

    return user.toJSON();
};

const getAll = async(id) => {
    let user = await User.find({}).exec();

    if (!user)
        throw new Error("not.found");

    return user;

}


const add = async(user) => {
    const newUser = new User(user);

    if (!newUser) {
        throw new Error("invalid input");
    }

    await newUser.save();

    return newUser.toJSON();
};

const update = async(id, newUserProperties) => {

    let oldUser = await User.findOne({ _id: id }).exec();

    if (!oldUser)
        throw new Error("not.found");

    await User.deleteOne({ _id: id });
    oldUser = oldUser.toJSON();

    let newUser = {
        ...oldUser,
        ...newUserProperties
    }

    newUser = User(newUser);

    if (!newUser)
        throw new Error("invalid.input")

    const res = await newUser.save();

    return res;

}

const remove = async(id) => {
    const res = await User.deleteOne({ _id: id });

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