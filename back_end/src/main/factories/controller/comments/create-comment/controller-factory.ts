import { BaseController } from "@infra/http/controllers/BaseController.js";
import { CreateCommentController } from "@infra/http/controllers/comments/CreateCommentController.js";
import { makeCreateComments } from "@main/factories/use-case/comments/create-comments-factory.js";
import { makeGetPostById } from "@main/factories/use-case/posts/get-post-by-id-factory.js";
import { makeUpdatePostTotalComments } from "@main/factories/use-case/posts/update-post-total-comments-factory.js";
import { makeCreateCommentValidation } from "./validation-factory.js";

export const makeCreateCommentController = (): BaseController => {
    const validation = makeCreateCommentValidation();
    const getPostByIdUseCase = makeGetPostById();
    const createCommentUseCase = makeCreateComments();
    const updatePostTotalCommentsUsecase = makeUpdatePostTotalComments();


    return new CreateCommentController(
        validation,
        getPostByIdUseCase,
        createCommentUseCase,
        updatePostTotalCommentsUsecase,
    );
}