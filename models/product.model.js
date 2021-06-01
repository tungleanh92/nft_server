const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    color: { type: mongoose.Schema.Types.ObjectId, ref: 'Color' },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: [{
        data: Buffer,
        name: String
    }],
    views: {
        type: Number,
        default: 0
    },
    popularPoint: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);