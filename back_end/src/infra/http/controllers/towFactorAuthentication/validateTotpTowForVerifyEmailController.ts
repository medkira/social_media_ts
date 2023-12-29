import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { forbidden, ok } from "@infra/http/helper/https.js";
import { ForbiddenError } from "@application/errors/ForbiddenError.js";
import { Validation } from "@infra/http/interfaces/Validation.js";
import { ValidateTotpInterface } from "@application/interfaces/use-cases/towFactorAuthentication/ValidateTotpInterface.js";
import { UpdateUserEmailVerifyInterface } from "@application/interfaces/use-cases/towFactorAuthentication/UpdateUserEmailVerifyInterface.js";

export class ValidateTotpForVerifyEmailController extends BaseController {
    constructor(
        private readonly verifyTotpValidation: Validation,
        private readonly validateTotp: ValidateTotpInterface,
        private readonly updateUserEmailVerify: UpdateUserEmailVerifyInterface,

    ) {
        super(verifyTotpValidation);
    }

    async execute(httpRequest: ValidateTotpForVerifyEmailController.Request): Promise<ValidateTotpForVerifyEmailController.Response> {
        // console.log("http reques from validat controller", httpRequest);
        const { totp } = httpRequest.body!;
        const userId = httpRequest.userId!;

        const result = await this.validateTotp.execute({ totp, userId });




        if (result instanceof ForbiddenError) {
            return forbidden(result);
        }

        // todo: as in the reposidotry we can teke the true here 
        this.updateUserEmailVerify.execute(userId);

        return ok({ message: 'Congratulations! Your email address has been successfully verified. Thank you for confirming your email with us.' });

    }
}

export namespace ValidateTotpForVerifyEmailController {
    export type Request = HttpRequest<ValidateTotpInterface.Request>;
    export type Response = HttpResponse<{ message: string } | ForbiddenError>;
}
