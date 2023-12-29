import { UserTotp } from "@domain/entities/UserTotp.js";

export interface GetUserTotpByUserIdRepository {
    getUserTotpByUserId(userId: GetUserTotpByUserIdRepository.Request): Promise<GetUserTotpByUserIdRepository.Response>
}

export namespace GetUserTotpByUserIdRepository {
    export type Request = string;
    export type Response = UserTotp | null;
}