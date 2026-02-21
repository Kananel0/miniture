const mongoose = require('mongoose');

// Define what your data looks like
const ItemSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Please add a title"] 
    },
    description: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Item', ItemSchema);