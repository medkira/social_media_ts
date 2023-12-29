import { User } from "@domain/entities/User.js";
import { UseCase } from "../UseCase.js";

export interface CheckTowFactorAuthInterface extends UseCase<CheckTowFactorAuthInterface.Request, CheckTowFactorAuthInterface.Response> {
    execute(email: CheckTowFactorAuthInterface.Request): Promise<CheckTowFactorAuthInterface.Response>;
}

export namespace CheckTowFactorAuthInterface {
    export type Request = User['email'];
    export type Response = Boolean;

}