import mongoose from "mongoose";

export default async function connectDatabase() {
    try {
        mongoose.connect(process.env.DATABASE_URI!);
    }
    catch (e) {
        console.log(e);
    }
}