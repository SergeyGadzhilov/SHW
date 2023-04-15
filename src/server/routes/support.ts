import express, { Request, Response } from "express";

export const support = express.Router();

support.post("/ticket", (req: Request, response: Response) => {
  response.render("index");
});
