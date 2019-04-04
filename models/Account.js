const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const AccountSchema = new Schema({
    //Every account is associated with actual User schema by id
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    expenses:[{
        type: Schema.Types.ObjectId,
        ref: 'expenses'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    startingBalance: {
        type: String,
        default: "0",
        required: true
    }
})

module.exports = Account = mongoose.model('accounts', AccountSchema);