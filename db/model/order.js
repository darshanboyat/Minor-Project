const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customerId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: {type: Object, required: true},
    user: {type: Object, required: true},
    OrderStatus: {type: String, default: 'Order Placed'},
    paymentType: {type: String, default: 'Cash on Delivery'}
},{timestamps: true});

module.exports = mongoose.model("Order", OrderSchema);