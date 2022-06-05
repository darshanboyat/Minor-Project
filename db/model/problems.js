const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema({
    name:{type: String, required: true},
    number:{type: Number, required: true}, 
    subject:{type: String},
    discription:{type: String, required: true}
},{timestamps: true});

module.exports = mongoose.model("Support" ,SupportSchema);