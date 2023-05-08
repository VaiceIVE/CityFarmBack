const {Schema, model} = require("mongoose")

const Type = new Schema({
    name: {type: String, required: true},
    icon: {type: String},
})


module.exports = model("Type", Type);