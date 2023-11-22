import { CreatePostRepository } from "@application/interfaces/repositories/posts/CreatePostRepository.js";
import PostModel from "../models/post.model.js";
import { mapDocument, objectIdToString, stringToObjectId } from "../helpers/mappers.js";
import { GetPostByIdRepository } from "@application/interfaces/repositories/posts/GetPostByIdRepository.js";
import { isValidObjectId } from "mongoose";
import { UpdatePostRepository } from "@application/interfaces/repositories/posts/UpdatePostRepository.js";
import { Post } from "@domain/entities/Post.js";
import { UpdatePostTotalComments } from "@application/use-cases/posts/UpdatePostTotalComments.js";
import { UpdatePostTotalCommentsRepository } from "@application/interfaces/repositories/posts/UpdatePostTotalCommentsRepository.js";
import { DeletePostRepository } from "@application/interfaces/repositories/posts/DeletePostInterface.js";

export class PostRepository implements
    CreatePostRepository,
    GetPostByIdRepository,
    UpdatePostRepository,
    UpdatePostTotalCommentsRepository,
    DeletePostRepository {


    async createPost(postData: CreatePostRepository.Request): Promise<string> {

        const post = new PostModel({
            ...postData,
            createdAt: new Date(),
        });

        const savedPost = await post.save();

        const postId = objectIdToString(savedPost._id);

        return postId;
    }


    async getPostById(postId: string): Promise<GetPostByIdRepository.Response> {
        if (!isValidObjectId(postId)) {
            return null;
        }

        const rawPost = await PostModel.findById(postId);
        return rawPost && mapDocument(rawPost);
    }


    async updatePost(params: UpdatePostRepository.Request): Promise<Post> {
        const { postId, postData } = params;
        const rawUpdatedPost = await PostModel.findOneAndUpdate(
            stringToObjectId(postId), { ...postData, updatedAt: new Date() }, {
            new: true
        }
        );
        return rawUpdatedPost && mapDocument(rawUpdatedPost);
    }

    async updatePostTotalComments(params: UpdatePostTotalCommentsRepository.Request): Promise<Post> {
        let { postId, totalComments } = params;
        totalComments = totalComments + 1;
        const rawUpdatedComment = await PostModel.findOneAndUpdate(
            stringToObjectId(postId),
            { $set: { totalComments } },
            { upsert: true, returnDocument: 'after' },
        );
        return mapDocument(rawUpdatedComment);
    }

    async deletePost(postId: string): Promise<void> {
        await PostModel.findOneAndDelete(stringToObjectId(postId));
    }


}