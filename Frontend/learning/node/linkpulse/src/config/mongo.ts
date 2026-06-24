import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB");
    }catch (err){
        console.error("MongoDB Connection error", err);
        process.exit(1);
    }
};

export default connectMongo;