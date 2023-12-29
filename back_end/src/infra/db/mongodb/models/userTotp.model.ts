import mongoose from "mongoose";

const { Schema } = mongoose;

const UserTotpSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    totp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
    },

});

const UserTotpModel = mongoose.model("userTotp", UserTotpSchema);

export default UserTotpModel;