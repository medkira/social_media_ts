import { ServerError } from "../errors/ServerError.js";
export const ok = (body) => ({
    statusCode: 200,
    body,
});
export const noContent = () => ({
    statusCode: 204,
    body: "",
});
export const badRequest = (error) => ({
    statusCode: 400,
    body: error,
});
export const unauthorized = (error) => ({
    statusCode: 401,
    body: error,
});
export const forbidden = (error) => ({
    statusCode: 403,
    body: error,
});
export const notFound = (error) => ({
    statusCode: 404,
    body: error,
});
export const serverError = (error) => {
    const stack = error instanceof Error ? error.stack : undefined;
    return {
        statusCode: 500,
        body: new ServerError(stack),
    };
};
//# sourceMappingURL=https.js.map