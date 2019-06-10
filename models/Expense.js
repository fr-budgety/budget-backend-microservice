const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ExpenseSchema = new Schema({
    //Every account is associated with actual User schema by id
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        default: 'No Description'
    },
    beneficiary: {
        type: String
    }
})

module.exports = Expense = mongoose.model('expenses', ExpenseSchema);