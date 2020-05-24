const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        // mongoose will check if email is unique in our system
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('users', userSchema)