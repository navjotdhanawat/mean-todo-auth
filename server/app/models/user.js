var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique : true
    },
    password: {
        type: String
    }
});