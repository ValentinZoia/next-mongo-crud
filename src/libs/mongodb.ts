import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1/next-tasks";

const MONGO_URI =  'mongodb+srv://valentinzoia:valentinzoiapassword@cluster0.jbd3gin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}