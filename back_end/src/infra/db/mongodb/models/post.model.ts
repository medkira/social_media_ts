import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    totalComments: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
});

const PostModel = mongoose.model('post', postSchema);

export default PostModel;
