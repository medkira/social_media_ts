import { RequiredFieldValidation } from "@infra/http/validation/RequiredFieldValidation.js";
import { ValidationComposite } from "@infra/http/validation/ValidationComposite.js";

export const makeCreateCommentValidation = (): ValidationComposite => {
    return new ValidationComposite([
        new RequiredFieldValidation('title'),
        new RequiredFieldValidation('text'),
        new RequiredFieldValidation('postId')
    ], 'body');
}