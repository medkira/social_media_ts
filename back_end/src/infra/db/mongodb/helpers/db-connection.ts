import mongoose from "mongoose";

class DbConnection {
    private url?: string;

    async connect(url: string): Promise<void> {
        try {
            await mongoose.connect(url);
            console.log("Connected to MongoDB 🚀");
        } catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        }
    }
}

export default new DbConnection();


// this.connection = mongoose.createConnection(url).on("open", () => {
//     console.log("connected to mongoBb 🚀");
// }).on("error", () => {
//     console.log("mongoDb connection error");
// })
// mongoose.connect(url).then(
//     () => (console.log("connected to mongoBb 🚀"))
// )
