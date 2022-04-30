const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
//api username and password with unique id(email id)
const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    email: { type: String },
    phone: { type: Number },
    password: { type: String, required: true },
},
    {
        versionKey: false,
        timestamps: true
    }
)


//storing hashed password in db
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("user", userSchema);


