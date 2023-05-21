import express, { Request, Response } from "express";
import { User } from "../accounts/User";
import { hashSync } from "bcryptjs";
import { Accounts } from "../accounts/Accounts";
import { randomBytes } from "crypto";
import { checkCSRF, setCSRF } from "../middleware/csrf";

export const accounts = express.Router();

accounts.get("/signup", setCSRF);
accounts.get("/signup", async (req: Request, response: Response) => {
  response.render("registration", { csrftoken: req.session?.csrf });
});

accounts.post("/signup", checkCSRF);
accounts.post("/signup", async (req: Request, response: Response) => {
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = hashSync(req.body.password, 8);

  if (user.name && user.email && user.password) {
    const account = new Accounts();
    const exists = await account.find(user.email);
    if (!exists) {
      account.create(user);
      return response.json({ status: "OK" });
    } else {
      return response.json({
        status: "Error",
        message: "User with this email already exists!",
      });
    }
  } else {
    return response.json({
      status: "Error",
      message: "name, email and password are required",
    });
  }
});
