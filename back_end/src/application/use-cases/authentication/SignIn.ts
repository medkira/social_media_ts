import { UnauthorizedError } from "@application/errors/UnauthorizedError.js";
import { HashComparer } from "@application/interfaces/cryptography/HashComparer.js";
import { JWTGenerator } from "@application/interfaces/cryptography/JWTGenerator.js";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/authentication/LoadUserByEmailRepository.js";
import { SignInInterface } from "@application/interfaces/use-cases/authentication/SignInInterface.js";

export class SignIn implements SignInInterface {
    constructor(
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
        private readonly hashCompare: HashComparer,
        private readonly jwtGenerator: JWTGenerator,

    ) { }

    async execute(credentials: SignInInterface.Request): Promise<SignInInterface.Response> {
        const { email, password } = credentials;
        const user = await this.loadUserByEmailRepository.loadUserByEmail(email);


        if (!user) {
            return new UnauthorizedError();
        }


        const isPasswordValid = await this.hashCompare.compare(password, user.password);
        if (!isPasswordValid) {
            return new UnauthorizedError();
        }

        return this.jwtGenerator.generate(user.id);
    }
}