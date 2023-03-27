import jwt from "jsonwebtoken";

import crypto from "crypto"

const generateSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};

const secret = generateSecret();

export const createToken = (payload: any) => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};