export interface DeleteUserTotpByUserIdpRepository {
    deleteUserTotp(userId: DeleteUserTotpByUserIdpRepository.Request): Promise<DeleteUserTotpByUserIdpRepository.Response>;
}

export namespace DeleteUserTotpByUserIdpRepository {
    export type Request = string;
    export type Response = void;
}