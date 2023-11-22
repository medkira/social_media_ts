import { BaseController } from "@infra/http/controllers/BaseController.js";
import { DeletePostController } from "@infra/http/controllers/posts/DeletePostController.js";
import { makeDeletePost } from "@main/factories/use-case/posts/delete-post-factory.js";
import { makeGetPostById } from "@main/factories/use-case/posts/get-post-by-id-factory.js";

export const makeDeletePostController = (): BaseController => {
    const getPostByIdUseCase = makeGetPostById();
    const deletePostUseCase = makeDeletePost();
    return new DeletePostController(getPostByIdUseCase, deletePostUseCase);
}