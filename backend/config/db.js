import mongoose from "mongoose";
import dotenv from 'dotenv'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'));
    } catch (error) {
        console.log(error);
        
    }
}
