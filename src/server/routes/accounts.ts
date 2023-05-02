import express, { Request, Response } from "express";

export const accounts = express.Router();

accounts.get("/registration", (req: Request, response: Response) => {
  response.render("registration");
});
