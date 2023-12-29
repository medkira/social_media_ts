import { UseCase } from "../UseCase.js";
import { UserTotp } from "@domain/entities/UserTotp.js";
import { UserTotpNotFound } from "@application/errors/UserTotpNotFound.js";

export interface GetTOTPByUserIdInterface extends UseCase<GetTOTPByUserIdInterface.Request, GetTOTPByUserIdInterface.Response> {
    execute(userId: GetTOTPByUserIdInterface.Request): Promise<GetTOTPByUserIdInterface.Response>
}

export namespace GetTOTPByUserIdInterface {
    export type Request = string;
    export type Response = UserTotp | UserTotpNotFound;
}