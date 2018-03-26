var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    title: {
        type: String
    },
    desc: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
});