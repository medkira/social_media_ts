import { UserTotpProps } from "@domain/entities/UserTotp.js";
import { UseCase } from "../UseCase.js";
import { ForbiddenError } from "@application/errors/ForbiddenError.js";

export interface ValidateTotpInterface extends UseCase<ValidateTotpInterface.Request, ValidateTotpInterface.Response> {
    execute(userTotp: ValidateTotpInterface.Request): Promise<ValidateTotpInterface.Response>;
}

export namespace ValidateTotpInterface {
    export type Request = Omit<UserTotpProps, 'createdAt' | 'expiresAt'>;
    export type Response = boolean | ForbiddenError;
}