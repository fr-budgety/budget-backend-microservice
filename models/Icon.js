const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const IconSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})

module.exports = Icon = mongoose.model('icons', IconSchema);