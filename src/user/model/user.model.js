const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
}, {
    versionKey: false,
    timestamps: true
});

const userModel = model("user", userSchema);

module.exports = userModel;