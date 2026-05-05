const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const corsHandler = cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    preflightContinue: true,
});

const startServer = async () => {
    // Run the code first. If error, jump to catch
    try {
        // Waiting for mongoose to connect
        await mongoose.connect('mongodb://localhost:27017/e-commerce');
        const app = express();
        app.use(express.json());
        app.use(corsHandler);
        app.listen(4000, () => {
            console.log('Server has started!');
        });
        app.use('/api', productRoutes)
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
};

startServer();