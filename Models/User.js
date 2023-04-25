const { Schema, model } = require('mongoose');

User = new Schema({
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
    confirmationCode: { 
        type: String, 
        unique: true },
    email: {type: String, unique: true, required: true},
    roles: [{type: String}],
    cash: {type: Number},
    hash: {type: String, required: true},
    profilePictureUri: {type: String},
});

module.exports = model("User", User);