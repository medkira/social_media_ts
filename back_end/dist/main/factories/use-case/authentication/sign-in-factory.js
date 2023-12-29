import { SignIn } from "@application/use-cases/authentication/SignIn.js";
export const makeSignIn = () => {
    const userRepository = new UserRespository();
    const bcrytAdapter = new BcrytAdapter();
    const jwtAdapter = new JwtAdapter();
    return new SignIn(userRepository, bcrytAdapter, jwtAdapter);
};
//# sourceMappingURL=sign-in-factory.js.map