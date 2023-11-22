import mongoose from "mongoose";
class DbConnection {
    url;
    async connect(url) {
        mongoose.createConnection(url).on("open", () => {
            console.log("connected to mongoBb 🚀");
        }).on("error", () => {
            console.log("mongoDb connection error");
        });
    }
}
export default new DbConnection();
//# sourceMappingURL=db-connection.js.map