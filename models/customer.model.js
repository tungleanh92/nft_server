const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    optionPayment: {
        type: String,
        required: true
    },
    cart: [{
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number
    }]
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Customer', CustomerSchema);