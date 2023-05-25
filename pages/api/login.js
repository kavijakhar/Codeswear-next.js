import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import CryptoJS from 'crypto-js';
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email });
        if (user) {
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8);
            if (req.body.email === user.email && req.body.password === decryptedPassword) {

                var token = jwt.sign({ success: true, email: user.email, name: user.name }, 'shhhhh');
                res.status(200).json({ success: true, token, name: user.name });
            } else {
                res.status(200).json({ success: false, error: "Invalid Credential" });
            }
        } else {
            res.status(200).json({ success: false, error: "No user found" });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
