import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const conn = async () => {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        isConnected = false;
        console.error('Error connecting to MongoDB:', error);
    }
};

export const disconnect = async () => {
    if (!isConnected) {
        console.log('No active MongoDB connection to close');
        return;
    }

    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};