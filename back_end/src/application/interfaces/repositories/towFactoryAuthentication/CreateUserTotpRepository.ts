import { UserTotpProps } from "@domain/entities/UserTotp.js"

export interface CreateUserTotpRepository {
    createUserTotp(userTotpData: CreateUserTotpRepository.Request): Promise<CreateUserTotpRepository.Response>
}

export namespace CreateUserTotpRepository {
    export type Request = Omit<UserTotpProps, 'createdAt'>;
    export type Response = void;
}