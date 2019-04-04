const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CategorySchema = new Schema({
    //Every account is associated with actual User schema by id
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
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
    },
    expenses:[{
        type: Schema.Types.ObjectId,
        ref: 'expenses'
    }],
})

module.exports = Category = mongoose.model('categories', CategorySchema);