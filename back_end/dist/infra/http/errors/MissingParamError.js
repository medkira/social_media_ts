export class MissingParamError extends Error {
    constructor(paramName) {
        super(`Missing param: ${paramName}`);
        this.name = `MissingParamError`;
    }
}
//# sourceMappingURL=MissingParamError.js.map