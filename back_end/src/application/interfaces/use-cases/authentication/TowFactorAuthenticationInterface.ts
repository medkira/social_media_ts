import { ForbiddenError } from "@application/errors/ForbiddenError.js";
import { UseCase } from "../UseCase.js";
import { UserTotpProps } from "@domain/entities/UserTotp.js";
import { User } from "@domain/entities/User.js";

export interface TowFactorAuthenticationInterface extends UseCase<TowFactorAuthenticationInterface.Request, TowFactorAuthenticationInterface.Response> {
    execute(userTotpData: TowFactorAuthenticationInterface.Request): Promise<TowFactorAuthenticationInterface.Response>
}

export namespace TowFactorAuthenticationInterface {
    export type Request = User["id"]
    export type Response = void | ForbiddenError;
}