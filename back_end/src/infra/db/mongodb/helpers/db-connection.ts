import mongoose from "mongoose";

class DbConnection {
    private url?: string;

    async connect(url: string): Promise<void> {
        try {
            await mongoose.connect(url);
            console.log("Connected to MongoDB 🚀 at ", url);
        } catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        }
    }
}

export default new DbConnection();



