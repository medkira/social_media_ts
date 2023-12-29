import { GetPostByIdInterface } from "@application/interfaces/use-cases/posts/GetPostByIdInterface.js";
import { GetPostById } from "@application/use-cases/posts/GetPostById.js";
import { PostRepository } from "@infra/db/mongodb/repositories/PostRepository.js";

export const makeGetPostById = (): GetPostByIdInterface => {
    const postRepository = new PostRepository();
    return new GetPostById(postRepository);
}