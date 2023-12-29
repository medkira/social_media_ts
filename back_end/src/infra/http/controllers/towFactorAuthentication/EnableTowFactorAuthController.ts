import { EnableTowFactorAuthRepository } from "@application/interfaces/repositories/towFactoryAuthentication/EnableTowFactorRepository.js";
import { BaseController } from "../BaseController.js";
import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { EnableTowFactorAuthInterface } from "@application/interfaces/use-cases/towFactorAuthentication/EnableTowFactorAuthInterface.js";
import { forbidden, notFound, ok } from "@infra/http/helper/https.js";
import { CheckEmailVerifiedInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CheckEmailVerifiedInterface.js";
import { LoadUserById } from "@application/use-cases/TowFactorAuthentication/LoadUserById.js";
import { LoadUserByIdInterface } from "@application/interfaces/use-cases/towFactorAuthentication/LoadUserByIdInterface.js";
import { UserNotFoundError } from "@application/errors/UserNotFoundError.js";
import { EmailNotVerifiedError } from "@application/errors/EmailNotVerifiedError.js";

export class EnableTowFactorAuthController extends BaseController {

    constructor(
        private readonly enableTowFactorAuth: EnableTowFactorAuthInterface,
        private readonly checkEmailVerified: CheckEmailVerifiedInterface,
        private readonly loadUserById: LoadUserByIdInterface,
    ) {
        super();
    }

    // todo : need to verifie if the user exist plus this feature need to be adjysted in many other



    async execute(httpRequest: EnableTowFactorAuthController.Request): Promise<EnableTowFactorAuthController.Response> {
        const id = httpRequest.userId!;
        const userOrError = await this.loadUserById.execute(id);

        if (userOrError instanceof UserNotFoundError) {
            return notFound(userOrError)
        }

        const { email } = userOrError;

        const emailVerifiedOrError = await this.checkEmailVerified.execute(email);
        if (emailVerifiedOrError instanceof EmailNotVerifiedError) {
            return forbidden(emailVerifiedOrError);
        }

        await this.enableTowFactorAuth.execute(id);
        return ok({
            message: "user enabled 2FA successfully"
        })

    }




}


export namespace EnableTowFactorAuthController {
    export type Request = HttpRequest<EnableTowFactorAuthInterface.Request>;
    export type Response = HttpResponse<undefined | { message: string } | UserNotFoundError | EmailNotVerifiedError>
}