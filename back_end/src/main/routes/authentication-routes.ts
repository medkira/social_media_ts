import { Router } from "express";
import { expressRouterAdapter } from "@main/adapters/express-router-adapter.js";
import { makeSignInController } from "@main/factories/controller/authentication/sign-in/controller-factory.js";
import { makeSignUpController } from "@main/factories/controller/authentication/sign-up/controller-factory.js";



export default (router: Router): void => {
    router.post('/login', expressRouterAdapter(makeSignInController()));
    router.post('/register', expressRouterAdapter(makeSignUpController()));
}