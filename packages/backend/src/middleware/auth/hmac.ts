import canonicalize from "canonicalize";
import crypto from "crypto";
import { RequestHandler } from "express";

import { env } from "../../config/env";

export const hmacAuthMiddleWare: RequestHandler = (req, res, next) => {
  const { body, headers } = req;
  if (!headers.authorization) {
    throw new Error("authorization header not set");
  }
  const [, schema, signature] = headers.authorization.split(" ");
  if (schema !== "HMAC_SHA_256") {
    throw new Error("authorization schema invalid");
  }
  const contentString = canonicalize(body);
  if (!contentString) {
    throw new Error("content invalid");
  }
  const contentHash = crypto.createHash("sha256").update(contentString).digest("base64");
  const expectedSignature = crypto.createHmac("sha256", env.authSecret).update(contentHash).digest("base64");
  if (signature !== expectedSignature) {
    throw new Error("hmac signature invalid");
  }
  next();
};
