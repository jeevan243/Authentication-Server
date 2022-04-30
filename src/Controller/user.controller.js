require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

let newtoken = (user) => {
    return jwt.sign({ user }, process.env.JWT_TOKEN)
}

const register = async (req, res) => {
    try {
        let user;
        if (req.body.email) {
            user = await User.findOne({ email: req.body.email })
        } else {
            user = await User.findOne({ phone: req.body.phone })
        }
        if (user) {
            return res.send("Use another Email or mobile To login")
        }
        user = await User.create(req.body);
        let token = newtoken(user);
        res.status(201).send({ token, name: user.user_name })
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

const login = async (req, res) => {
    try {
        let user;
        if (req.body.email) {
            user = await User.findOne({ email: req.body.email })
        } else {
            user = await User.findOne({ phone: req.body.phone })
        }
        if (!user) {
            return res.status(404).send("email or password incorrect");
        }
        const match = user.checkPassword(req.body.password);
        if (!match)
            return res
                .status(400)
                .send({ message: "Please try another email or password" });
        const token = newtoken(user);
        res.status(200).send({ token, name: user.user_name })
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = { register, login }