const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    order:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        default: 1,
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

module.exports = mongoose.model("order", orderSchema);