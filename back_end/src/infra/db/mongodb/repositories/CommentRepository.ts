import { CreateCommentRepository } from "@application/interfaces/repositories/comments/CreateCommentRepository.js";
import CommentModel from "../models/comment.model.js";
import { mapDocument, objectIdToString, stringToObjectId } from "../helpers/mappers.js";
import { GetTotalCommentsByPostIdRepository } from "@application/interfaces/repositories/posts/GetTotalCommentsByPostIdRepository.js";
import { DeleteCommentRepository } from "@application/interfaces/repositories/comments/DeleteCommentRepository.js";
import { GetCommentByIdRepository } from "@application/interfaces/repositories/comments/GetCommentByIdRepository.js";

export class CommentRepository implements
    CreateCommentRepository,
    GetTotalCommentsByPostIdRepository,
    DeleteCommentRepository,
    GetCommentByIdRepository {


    async createComment(commentData: CreateCommentRepository.Request): Promise<string> {
        const comment = new CommentModel({
            ...commentData,
            createdAt: new Date(),
        });

        const savedComment = await comment.save();

        return objectIdToString(savedComment._id);
    }

    async getTotalCommentsByPostId(postId: GetTotalCommentsByPostIdRepository.Request): Promise<GetTotalCommentsByPostIdRepository.Response> {
        return await CommentModel.countDocuments({ postId })
    }


    async deleteComment(commentId: DeleteCommentRepository.Request): Promise<DeleteCommentRepository.Response> {
        await CommentModel.findOneAndDelete(stringToObjectId(commentId));
    }

    async getCommentById(commentId: GetCommentByIdRepository.Request): Promise<GetCommentByIdRepository.Response> {
        const rawComment = await CommentModel.findById(stringToObjectId(commentId));
        return rawComment && mapDocument(rawComment);
    }

}