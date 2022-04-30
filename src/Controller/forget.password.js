const express = require("express");
var bodyParser = require('body-parser');
const User = require("../model/user.model")
const bcrypt = require("bcryptjs/dist/bcrypt");


const router = express.Router();
const hashing = (req, res, next) => {

    var hash = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hash;
    return next();
}
router.patch("/", hashing, async (req, res) => {


    try {
        let user;
        if (req.body.email) {
            user = await User.findOneAndUpdate({ email: req.body.email },
                { password: req.body.password }, { new: true }).lean().exec();
            return res.status(200).send(user);
        } else if (req.body.phone) {
            console.log(req.body.phone)
            user = await User.findOneAndUpdate({ phone: req.body.phone },
                { password: req.body.password }, { new: true }).lean().exec();
            return res.status(200).send(user);
        }
    }
    catch (e) {
        return res.status(500).send(e.message)
    }
})

router.get("/", async (req, res) => {

    try {
        let user;
        if (req.body.phone) {
            user = await User.findOne({ phone: req.body.phone }).lean().exec();
            if (user) {
                return res.send({ status: true });
            } else {
                return res.send({ status: false })
            }
        }
        else if (req.body.email) {
            user = await User.findOne({ email: req.body.email }).lean().exec();
            if (user) {
                return res.send({ status: true });
            } else {
                return res.send({ status: false })
            }
        }
    }
    catch (e) {
        return res.status(500).send(e.message)
    }
})

module.exports = router;