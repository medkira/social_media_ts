import { badRequest, serverError } from "../helper/https.js";
export class BaseController {
    validation;
    constructor(validation) {
        this.validation = validation;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation?.validate(httpRequest);
            if (error) {
                return badRequest(error);
            }
            else {
                return await this.execute(httpRequest);
            }
        }
        catch (error) {
            return serverError(error);
        }
    }
}
//# sourceMappingURL=BaseController.js.map