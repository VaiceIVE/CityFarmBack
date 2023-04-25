const {Schema, model} = require("mongoose")

const Order = new Schema({
    userid: {type: String, required: true},
    lotid: [{type: String, required: true}],
    status: {type: String}
})


module.exports = model("Order", Order);