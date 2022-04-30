const express = require("express");
require("dotenv").config();
const connect = require("./config/db");

let port = process.env.PORT || 5000;

const { register, login } = require("./Controller/user.controller");
const forgetController = require("./Controller/forget.password")

const app = express();
app.use(express.json());

app.use(cors())


app.post("/register", register);
app.post("/login", login);
app.use("/forget", forgetController);




app.listen(port, async (req, res) => {
    try {
        await connect();
        console.log(`listening to the port ${port}`);
    }
    catch (e) {
        console.log(e.message);
    }
})


