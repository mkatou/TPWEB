const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid')

const alertSchema = mongoose.Schema({
    _id: {
        type: String,
        default: function genUUID() {
            return uuidv4();
        },
        required: true
    },
    type: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    status: {
        type: String,
        require: true
    },
    from: {
        type: String,
        require: true
    },
    to: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('Alert', alertSchema);