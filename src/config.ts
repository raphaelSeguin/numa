export const nodeEnv = process.env.NODE_ENV || "developpment";

// openssl rand -hex 32
export const jwtConfig = {
  secretKey: process.env.JWT_SECRET || "a7a4880b73a4ec4a86ee6ba92a2e4404c0df228d6ac9e9192c3c4be699f07ef2",
  issuer: process.env.JWT_ISSUER || "numa",
  audience: process.env.JWT_AUDIENCE || "numa",
  expirationTime: process.env.JWT_EXP || "5 min",
};
// private key
// openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
// public key for the private key
// openssl rsa -in private.pem -outform PEM -pubout -out public.pem
