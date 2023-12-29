import { DecodedToken } from "@domain/entities/TokenPayload.js";

export interface JWTVerifier {
    verify(jwt: string): Promise<DecodedToken | null>;
}