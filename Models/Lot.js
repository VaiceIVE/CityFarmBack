const {Schema, model} = require("mongoose")

const Lot = new Schema({
    userid: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
})


module.exports = model("Lot", Lot);