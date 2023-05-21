import { randomBytes } from "crypto";
import { Request, Response, NextFunction } from "express";

export function setCSRF(req: Request, res: Response, next: NextFunction) {
  if (req.session && !req.session.csrf) {
    req.session.csrf = randomBytes(100).toString("base64");
  }
  next();
}

export function checkCSRF(req: Request, res: Response, next: NextFunction) {
  if (!req.body.csrf) {
    return res.json({
      status: "Error",
      message: "CSRF Token not included",
    });
  }

  if (req.body.csrf !== req.session?.csrf) {
    return res.json({
      status: "Error",
      message: "CSRF tokens do not match",
    });
  }

  next();
}
