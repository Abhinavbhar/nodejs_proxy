import mongoose from "mongoose";

// MongoDB connection URI
const MONGO_URI = 'mongodb://mongo:27017/proxy';

// Connection options
const options = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    autoIndex: true, // Build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Mongoose connection disconnected through app termination');
            process.exit(0);
        });

        // Return the Mongoose connection (MongoDB client)
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
