const mongoose = required("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
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

export default mongoose.model("Order" , orderSchema)