import mongoose from "mongoose";

export default async function connectDatabase() {
    try {
        console.log(`Connecting to ${process.env.DATABASE_URI}`);
        mongoose.connect(process.env.DATABASE_URI!, { 
            user: process.env.DATABASE_USERNAME, 
            pass: process.env.DATABASE_PASSWORD 
        });
    }
    catch (e) {
        console.log(e);
    }
}