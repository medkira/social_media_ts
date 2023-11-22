import { EmailValidation } from "@infra/http/validation/EmailValidation.js";
import { RequiredFieldValidation } from "@infra/http/validation/RequiredFieldValidation.js";
import { ValidationComposite } from "@infra/http/validation/ValidationComposite.js";
import { EmailValidatorAdapter } from "@infra/http/validator/EmailValidatorAdapter.js";


export const makeSignUpValidation = (): ValidationComposite => {
    const emailValidator = new EmailValidatorAdapter();

    return new ValidationComposite([
        new RequiredFieldValidation('name'),
        new RequiredFieldValidation('username'),
        new RequiredFieldValidation('email'),
        new RequiredFieldValidation('password'),
        new EmailValidation('email', emailValidator),
    ], 'body');
}