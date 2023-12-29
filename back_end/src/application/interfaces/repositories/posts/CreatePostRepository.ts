import { PostProps } from "@domain/entities/Post.js"

export interface CreatePostRepository {
    createPost(postData: CreatePostRepository.Request): Promise<CreatePostRepository.Response>
}

export namespace CreatePostRepository {
    export type Request = Omit<PostProps, 'id' | 'createdAt' | 'updatedAt'>;
    export type Response = string

}