
// todo need to change the payload to an object , so it can follow the authMidl userId
export interface JWTGenerator {
    generate(payload: any): Promise<string>;
}