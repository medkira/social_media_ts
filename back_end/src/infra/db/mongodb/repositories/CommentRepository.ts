import { CreateCommentRepository } from "@application/interfaces/repositories/comments/CreateCommentRepository.js";
import CommentModel from "../models/comment.model.js";
import { objectIdToString } from "../helpers/mappers.js";
import { GetTotalCommentsByPostIdRepository } from "@application/interfaces/repositories/posts/GetTotalCommentsByPostIdRepository.js";
import PostModel from "../models/post.model.js";

export class CommentRepository implements
    CreateCommentRepository,
    GetTotalCommentsByPostIdRepository {


    async createComment(commentData: CreateCommentRepository.Request): Promise<string> {
        const comment = new CommentModel({
            ...commentData,
            createdAt: new Date(),
        });

        const savedComment = await comment.save();

        return objectIdToString(savedComment._id);
    }

    getTotalCommentsByPostId(postId: GetTotalCommentsByPostIdRepository.Request): Promise<GetTotalCommentsByPostIdRepository.Response> {
        return CommentModel.countDocuments({ postId })
    }
}