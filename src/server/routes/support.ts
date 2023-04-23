import express, { Request, Response } from "express";
import { Support } from "../support/Support";

export const support = express.Router();

support.post("/ticket", (req: Request, response: Response) => {
  const support = new Support();
  support.createTicket({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  response.json({ Status: "OK" });
});
