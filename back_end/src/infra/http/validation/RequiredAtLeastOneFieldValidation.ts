import { Validation } from "../interfaces/Validation.js";
import { MissingParamError } from "../errors/MissingParamError.js";
import { error } from "console";
import { truncate } from "fs";

export class RequiredAtLeastOneFieldValidation implements Validation {
    constructor(
        private readonly fieldNames: string[],
    ) { }

    validate(input: any): Error | null {

        // * method with some method 
        const hasAtLeastOneField = this.fieldNames.some(fieldName => input[fieldName] !== undefined);


        // * method with reduce method
        // const hasAtLeastOneField = this.fieldNames.reduce(
        //     (accumulator: boolean, fieldName: string) => accumulator || input[fieldName] !== undefined,
        //     false
        // );

        if (!hasAtLeastOneField) {
            const errorMessage = `Missing parameter(s): ${this.fieldNames.join(' || ')}`;
            return new MissingParamError(errorMessage);
        }


        return null;
    }
}
