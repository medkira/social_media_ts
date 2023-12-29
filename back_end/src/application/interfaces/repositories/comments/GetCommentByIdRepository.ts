import { Comment } from "@domain/entities/Comment.js";

export interface GetCommentByIdRepository {
    getCommentById(commentId: GetCommentByIdRepository.Request): Promise<GetCommentByIdRepository.Response>;
}

export namespace GetCommentByIdRepository {
    export type Request = string;
    export type Response = Comment | null;
}