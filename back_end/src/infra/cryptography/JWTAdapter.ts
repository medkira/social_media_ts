import { JWTGenerator } from "@application/interfaces/cryptography/JWTGenerator.js";
import { JWTVerifier } from "@application/interfaces/cryptography/JWTVerifier.js";
import { DecodedToken } from "@domain/entities/TokenPayload.js";
import jwt from 'jsonwebtoken';

export class JWTAdapter implements JWTGenerator, JWTVerifier {

    constructor(private readonly secret: string) { }

    // todo : need to change the payload type here 
    // todo  it could be anything ... dont make it any!! xD
    async generate(payload: any): Promise<string> {
        return jwt.sign(payload, this.secret);
    }



    async verify(token: string): Promise<DecodedToken | null> {
        try {
            return jwt.verify(token, this.secret) as DecodedToken;
        } catch (error) {
            return null;
        }
    }
}