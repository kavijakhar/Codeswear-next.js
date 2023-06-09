const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: String,
        default: ''
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ],
    address: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        required: true
    }

}, { timeStamps: true });

mongoose.models = {}

export default mongoose.model("Order", orderSchema)