const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid')

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        default: function genUUID() {
            return uuidv4();
        },
        required: true
    },
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('User', userSchema);