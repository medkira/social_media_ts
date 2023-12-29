export interface UpdateUserEmailVerifyRepository {
    updateUserEmailVerify(userId: UpdateUserEmailVerifyRepository.Request): Promise<UpdateUserEmailVerifyRepository.Response>
}

export namespace UpdateUserEmailVerifyRepository {
    export type Request = string;
    export type Response = void;
}