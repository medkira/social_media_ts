import { UnauthorizedError } from "@application/errors/UnauthorizedError.js";
export class SignIn {
    loadUserByEmailRepository;
    hashCompare;
    jwtGenerator;
    constructor(loadUserByEmailRepository, hashCompare, jwtGenerator) {
        this.loadUserByEmailRepository = loadUserByEmailRepository;
        this.hashCompare = hashCompare;
        this.jwtGenerator = jwtGenerator;
    }
    async execute(credentials) {
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
//# sourceMappingURL=SignIn.js.map