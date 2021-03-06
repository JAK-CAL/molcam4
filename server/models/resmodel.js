const mongoose = require('mongoose');

const resSchema = mongoose.Schema({
    old: {
        type: String
    },
    bed: {
        type: String
    },
    soil:{
        type: String
    },
    grass:{
        type: String
    },
    futsal:{
        type: String
    },
    basket:{
        type: String
    },
    tenis:{
        type: String
    },
    health:{
        type: String
    },
    PC:{
        type: String
    },
    trans:{
        type: String
    },
    taste:{
        type: String
    },
    PXdis:{
        type: String
    },
    email:{
        type: String
    },
    vaca:{
        type: String
    }
})

const res = mongoose.model('res', resSchema);

module.exports = res