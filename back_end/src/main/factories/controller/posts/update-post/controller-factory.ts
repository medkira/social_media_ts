import { BaseController } from "@infra/http/controllers/BaseController.js";
import { makeUpdatePostValidation } from "./validation-factory.js";
import { makeUpdatePost } from "@main/factories/use-case/posts/update-post-factory.js";
import { UpdatePostController } from "@infra/http/controllers/posts/UpdatePostController.js";
import { makeGetPostById } from "@main/factories/use-case/posts/get-post-by-id-factory.js";

export const makeUpdatePostController = (): BaseController => {
    const validation = makeUpdatePostValidation();
    const updatePostUseCase = makeUpdatePost();
    const getPostByIdUseCase = makeGetPostById();
    return new UpdatePostController(validation, getPostByIdUseCase, updatePostUseCase);
}