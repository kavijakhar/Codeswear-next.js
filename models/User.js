const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true, 
    },


}, { timeStamps: true });
mongoose.models={}
export default mongoose.model("Product", UserSchema)