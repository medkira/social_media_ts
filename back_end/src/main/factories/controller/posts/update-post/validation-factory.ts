import { RequiredAtLeastOneFieldValidation } from "@infra/http/validation/RequiredAtLeastOneFieldValidation.js";
import { RequiredFieldValidation } from "@infra/http/validation/RequiredFieldValidation.js";
import { ValidationComposite } from "@infra/http/validation/ValidationComposite.js";

export const makeUpdatePostValidation = (): ValidationComposite => {
    return new ValidationComposite([
        new RequiredAtLeastOneFieldValidation(['text', 'title']),
    ], 'body');
}