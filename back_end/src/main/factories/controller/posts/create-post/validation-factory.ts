import { RequiredFieldValidation } from "@infra/http/validation/RequiredFieldValidation.js";
import { ValidationComposite } from "@infra/http/validation/ValidationComposite.js";

export const makeCreatePostValidation = (): ValidationComposite => {
    return new ValidationComposite([
        new RequiredFieldValidation('title'),
        new RequiredFieldValidation('text'),
    ], 'body');
}