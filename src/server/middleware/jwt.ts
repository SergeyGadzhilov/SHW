import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Settings } from "../app/Settings";
import { AuthRequest } from "../requests/auth";

export function createJwt(data: Object) {
  const settings = Settings.getInstance();
  return jwt.sign(data, settings.jwtSecret, settings.jwtOptions);
}

export function verfifyJwt(req: Request, _: Response, next: NextFunction) {
  try {
    if (req.session && req.session.jwt) {
      const settings = Settings.getInstance();
      const payload = jwt.verify(
        req.session.jwt,
        settings.jwtSecret
      ) as JwtPayload;
      const authRequest = req as AuthRequest;
      authRequest.user_id = parseInt(payload.user_id);
    }
  } finally {
    next();
  }
}
