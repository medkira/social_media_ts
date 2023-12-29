import { UserTotp, UserTotpProps } from "@domain/entities/UserTotp.js";
import { UseCase } from "../UseCase.js";

export interface CreateTOTPInterface extends UseCase<CreateTOTPInterface.Request, CreateTOTPInterface.Response> {
    execute(email: CreateTOTPInterface.Request): Promise<CreateTOTPInterface.Response>
}

export namespace CreateTOTPInterface {
    export type Request = string;

    // ! this need to be change cant  return string fix it also in create totp
    export type Response = string | UserTotp;

}