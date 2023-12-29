import { UseCase } from "../UseCase.js";
import { UserTotpProps } from "@domain/entities/UserTotp.js";

export interface CreateTOTPSecretInterface extends UseCase<CreateTOTPSecretInterface.Request, CreateTOTPSecretInterface.Response> {
    execute(totp: CreateTOTPSecretInterface.Request): Promise<CreateTOTPSecretInterface.Response>
}

export namespace CreateTOTPSecretInterface {
    export type Request = any;
    export type Response = string;

}