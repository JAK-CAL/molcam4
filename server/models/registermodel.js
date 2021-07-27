const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        unique: 1
    },
    password: {
        type:String,
    },
    role:{
        type: Number,
        default: 0
    },
    image: {
        type: String
    }
})


const user = mongoose.model('user',userSchema);


module.exports = user
    
