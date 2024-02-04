const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:qkp2e3HD4319AEC3@cluster0.xcouclx.mongodb.net/");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 15,
        lowercase: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}
