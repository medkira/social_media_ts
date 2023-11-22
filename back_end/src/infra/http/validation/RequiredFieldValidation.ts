import { MissingParamError } from "../errors/MissingParamError.js";
import { Validation } from "../interfaces/Validation.js";


export class RequiredFieldValidation implements Validation {
    constructor(
        private readonly fieldName: string,
    ) { }

    validate(input: any): Error | null {
        if (!input[this.fieldName]) {
            return new MissingParamError(this.fieldName);
        }
        return null;
    }
}