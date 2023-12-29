import { CommentProps } from "@domain/entities/Comment.js";

export interface CreateCommentRepository {
    createComment(commentData: CreateCommentRepository.Request): Promise<CreateCommentRepository.Response>
}

export namespace CreateCommentRepository {
    export type Request = Omit<CommentProps, 'id' | 'createdAt' | 'updatedAt'>;
    export type Response = string

}