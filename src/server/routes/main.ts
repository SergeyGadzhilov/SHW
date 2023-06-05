import express, { Request, Response } from "express";
import { verfifyJwt } from "../middleware/jwt";
import { AuthRequest } from "../requests/auth";

export const main = express.Router();

main.get("/", [verfifyJwt], (req: Request, response: Response) => {
  const request = req as AuthRequest;
  response.render("index", { user_id: request.user_id });
});
