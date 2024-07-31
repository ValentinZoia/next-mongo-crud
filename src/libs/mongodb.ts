import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1/next-tasks";

console.log(process.env.MONGO_URI)

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
    
}