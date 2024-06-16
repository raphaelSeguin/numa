import { SignJWT, jwtVerify } from "jose";
import { jwtConfig } from "../config";

const key = new TextEncoder().encode(jwtConfig.secretKey);

export function generateJWT(payload: {}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(jwtConfig.issuer)
    .setAudience(jwtConfig.audience)
    .setExpirationTime("5 min")
    .sign(key);
}

export function verifyJWT(jwt: string) {
  return jwtVerify(jwt, key);
}
