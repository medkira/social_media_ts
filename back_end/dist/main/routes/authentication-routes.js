import { expressRouterAdapter } from "@main/adapters/express-router-adapter.js";
import { makeSignInController } from "@main/factories/controller/authentication/sign-in/controller-factory.js";
export default (router) => {
    router.post('/login', expressRouterAdapter(makeSignInController()));
};
//# sourceMappingURL=authentication-routes.js.map