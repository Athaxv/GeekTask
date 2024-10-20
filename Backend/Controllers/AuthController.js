const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "user already exists, you can login ", success: false })
        }
        const UserModel = new userModel({ name, email, password})
        UserModel.password = await bcrypt.hash(password, 10);
        await UserModel.save();
        res.status(201)
            .json({
                message: "signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}
const login = async (req, res) => {
    try {
        const {  email, password } = req.body;
        const user = await userModel.findOne({ email });
        const errormsg = 'Authentication failed';
        if (!user) {
            return res.status(403)
                .json({ message: errormsg, success: false })
        }
        const isPassequal = await bcrypt.compare(password, user.password);
        if (!isPassequal){
            return res.status(403)
                .json({ message: errormsg, success: false })
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        )
        if (!jwtToken){
            return res.status(505)
                .json({message: "main cause", success: false})
        }
        res.status(200)
            .json({
                message: "login success",
                success: true,
                jwtToken,
                email,
                name: user.name,
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}