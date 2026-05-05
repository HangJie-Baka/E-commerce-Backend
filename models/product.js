const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true}, 
    description: {type: String, trim: true},
    price: {type: Number, required: true, min: 0},
    category: {type: String, required: true, trim: true}
});

module.exports = mongoose.model('Product', ProductSchema);