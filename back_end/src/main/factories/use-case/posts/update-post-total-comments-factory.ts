import { UpdatePostTotalCommentsInterface } from "@application/interfaces/use-cases/posts/UpdatePostTotalComments.js";
import { UpdatePostTotalComments } from "@application/use-cases/posts/UpdatePostTotalComments.js";
import { CommentRepository } from "@infra/db/mongodb/repositories/CommentRepository.js";
import { PostRepository } from "@infra/db/mongodb/repositories/PostRepository.js";

export const makeUpdatePostTotalComments = (): UpdatePostTotalCommentsInterface => {
    const commentRepository = new CommentRepository();
    const postRepository = new PostRepository()
    return new UpdatePostTotalComments(commentRepository, postRepository);
}