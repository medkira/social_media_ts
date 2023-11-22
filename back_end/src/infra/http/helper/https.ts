import { HttpResponse } from "../interfaces/HttpResponse.js";
import { ServerError } from "../errors/ServerError.js";

export const ok = <T = any>(body: any): HttpResponse<T> => ({
    statusCode: 200,
    body,
});

export const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: "",
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
    statusCode: 400,
    body: error,
});

export const unauthorized = (error: Error): HttpResponse<Error> => ({
    statusCode: 401,
    body: error,
});

export const forbidden = (error: Error): HttpResponse<Error> => ({
    statusCode: 403,
    body: error,
});

export const notFound = (error: Error): HttpResponse<Error> => ({
    statusCode: 404,
    body: error,
});

export const serverError = (error?: Error | unknown): HttpResponse<Error> => {
    const stack = error instanceof Error ? error.stack : undefined;
    return {
        statusCode: 500,
        body: new ServerError(stack),
    }
}