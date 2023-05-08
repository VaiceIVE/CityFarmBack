const {Schema, model} = require("mongoose")

const Lot = new Schema({
    userid: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    type: {type: String},
    farm: {type: String},
    icon: {type: String},
})


module.exports = model("Lot", Lot);