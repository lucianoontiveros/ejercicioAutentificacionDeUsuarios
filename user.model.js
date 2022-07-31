const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const schemaUser = new Schema({ 
    email: { type: String, required: true, minLenght: 5},
    password: { type: String, required: true },
    salt: { type: String, required: true }
})

const User = mongoose.model('User', schemaUser)
module.exports = User 