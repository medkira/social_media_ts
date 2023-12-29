import { BaseController } from "@infra/http/controllers/BaseController.js";
import { CreatePostController } from "@infra/http/controllers/posts/CreatePostController.js";
import { makeCreatePostValidation } from "./validation-factory.js";
import { makeCreatePost } from "@main/factories/use-case/posts/create-post-factory.js";

export const makeCreatePostController = (): BaseController => {
    const validation = makeCreatePostValidation();
    const useCase = makeCreatePost();
    return new CreatePostController(validation, useCase);
}