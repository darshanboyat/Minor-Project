const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    name:{type: String, required: true},
    address: {type: String, required: true},
    password:{type: String, required: true},
    number:{type: Number, required: true},
    role: {type: String, default: 'customer'}  
},{timestamps: true});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);