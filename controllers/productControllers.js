const Product = require('../models/product');

// Create product function
const createProduct = async (req, res) => {
    // Try to run code. Fail => catch error
    try {
        const product = new Product(req.body); // function to add product
        const saved = await product.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Filter and get all product
const getAllProducts = async (req, res) => {
    try {
        const query = {};

        // If category exists in query string, add it to MongoDB query
        if (req.query.category) {
            query.category = req.query.category;
        }

        const products = await Product.find(query);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get specific item
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' })
        res.json(product);        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Find item by id, then update using req.body
    if (!product) return res.status(404).json({ message: 'Product not found'});
    res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found"})
            res.json({message: "Product deleted"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
