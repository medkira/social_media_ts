import { Post, PostProps } from "@domain/entities/Post.js";

export interface UpdatePostRepository {
    updatePost(params: UpdatePostRepository.Request): Promise<UpdatePostRepository.Response>
}

export namespace UpdatePostRepository {
    export type PostDataType = Partial<Omit<PostProps, 'id' | 'userId' | 'totalComments' | 'createdAt' | 'updatedAt'>>;
    export type Request = { postId: string, postData: PostDataType }
    export type Response = Post;
}

