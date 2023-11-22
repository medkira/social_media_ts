import { ForbiddenError } from "@application/errors/ForbiddenError.js";
import { JWTVerifier } from "@application/interfaces/cryptography/JWTVerifier.js";
import { AuthenticateInterface } from "@application/interfaces/use-cases/authentication/AuthenticateInterface.js";

export class Authenticate implements AuthenticateInterface {
    constructor(
        private readonly jwtVerifier: JWTVerifier,
    ) { }

    async execute(authenticationToken: string): Promise<AuthenticateInterface.Response> {
        const decodeToken = await this.jwtVerifier.verify(authenticationToken);
        if (!decodeToken) {
            return new ForbiddenError();
        }
        return decodeToken;
    }

}