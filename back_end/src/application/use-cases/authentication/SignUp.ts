import { EmailInUseError } from "@application/errors/EmailInUseError.js";
import { HashGenerator } from "@application/interfaces/cryptography/HashGenerator.js";
import { CreateUserRepository } from "@application/interfaces/repositories/authentication/CreateUserRepository.js";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/authentication/LoadUserByEmailRepository.js";
import { SignUpInterface } from "@application/interfaces/use-cases/authentication/SignUpInterface.js";

export class SignUp implements SignUpInterface {

    constructor(
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
        private readonly createUserRepository: CreateUserRepository,
        private readonly hashGenerator: HashGenerator,
    ) { }
    async execute(userData: SignUpInterface.Request): Promise<SignUpInterface.Response> {
        const { email, password } = userData;
        const existingUser = await this.loadUserByEmailRepository.loadUserByEmail(email);
        if (existingUser) {
            return new EmailInUseError()
        }

        const hashedPassword = await this.hashGenerator.hash(password);

        return this.createUserRepository.createUser({
            ...userData,
            password: hashedPassword,
        });
    }


}