import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { SignInInterface } from "@application/interfaces/use-cases/authentication/SignInInterface.js";
import { CreateTOTPInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CreateTOTPInterface.js";
import { CheckEmailVerifiedInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CheckEmailVerifiedInterface.js";
import { SendTotpToEmailInterface } from "@application/interfaces/use-cases/towFactorAuthentication/SendTotpToEmailInterface.js";
import { UnauthorizedError } from "@application/errors/UnauthorizedError.js";
import { ok, unauthorized } from "@infra/http/helper/https.js";
import { EmailNotVerifiedError } from "@application/errors/EmailNotVerifiedError.js";
import { Validation } from "@infra/http/interfaces/Validation.js";
import { UserTotp } from "@domain/entities/UserTotp.js";
import { CreateTOTPSecretInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CreateTOTPSecretInterface.js";



export class VerifyEmailController extends BaseController {
    constructor(
        private readonly signIn: SignInInterface,
        private readonly createTOTP: CreateTOTPInterface,
        private readonly checkEmailverified: CheckEmailVerifiedInterface,
        private readonly sendTotpToEmail: SendTotpToEmailInterface,
        private readonly verifyEmailValidation: Validation,
        private readonly createTOTPSecret: CreateTOTPSecretInterface,

    ) {
        super(verifyEmailValidation);
    }

    async execute(httpRequest: VerifyEmailController.Request): Promise<VerifyEmailController.Response> {
        const { email, password } = httpRequest.body!;


        const authenticationTokenOrError = await this.signIn.execute({ email, password });
        if (authenticationTokenOrError instanceof UnauthorizedError) {
            return unauthorized(authenticationTokenOrError)
        }

        const isEmailVerified = await this.checkEmailverified.execute(email);


        // todo: this need to be changed : EmailNotVerifiedError is not an error here xD

        if (isEmailVerified instanceof EmailNotVerifiedError) {

            const totpData = await this.createTOTP.execute(email);


            if (totpData instanceof UserTotp) {
                const { totp, userId } = totpData;

                this.sendTotpToEmail.execute({ email: email, totp: totp });

                const TotpSecret = await this.createTOTPSecret.execute({ totp, userId });


                return ok({
                    message: `code sent to ${email}`,
                    totpSecret: TotpSecret,
                });
            }



        }

        // todo: this need to work when EmailIsVerifiedError xD
        return ok({
            success: false, message: 'Email already verified'
        });



    }
}



export namespace VerifyEmailController {
    export type Request = HttpRequest<SignInInterface.Request>
    export type Response = HttpResponse<{ message: string, totpSecret: string } | { authenticationToken: string } | UnauthorizedError>
}