import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import CryptoJS from 'crypto-js';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.JWT_SECRET).toString();
        const user = new User({ name, email, password: encryptedPassword });
        await user.save();
        res.status(200).json({ success: "success" });
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);

