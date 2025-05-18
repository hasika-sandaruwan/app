const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    customer: {
        required: true,
        type: Object
    },
    product: {
        required: true,
        type: Object
    },
    total: {
        required: true,
        type: Number
    },
    qty: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        type: Date
    },
    isPaid: {
        required: true,
        type: Boolean
    }
});
module.exports = mongoose.model('order', OrderSchema);