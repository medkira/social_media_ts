import { BaseController } from "@infra/http/controllers/BaseController.js";
import { GetPostByIdController } from "@infra/http/controllers/posts/GetPostByIdController.js";
import { makeGetPostById } from "@main/factories/use-case/posts/get-post-by-id-factory.js";

export const makeGetPostByIdController = (): BaseController => {
    const usecase = makeGetPostById();
    return new GetPostByIdController(usecase);
}