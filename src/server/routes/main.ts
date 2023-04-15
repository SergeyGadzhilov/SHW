import express, { Request, Response } from "express";

export const main = express.Router();

main.get("/", (req: Request, response: Response) => {
  response.render("index");
});
