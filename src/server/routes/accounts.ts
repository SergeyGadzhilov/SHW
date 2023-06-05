import express, { Request, Response } from "express";
import { User } from "../accounts/User";
import { hashSync, compareSync } from "bcryptjs";
import { Accounts } from "../accounts/Accounts";
import { checkCSRF, setCSRF } from "../middleware/csrf";
import { createJwt } from "../middleware/jwt";

export const accounts = express.Router();

accounts.get("/signup", [setCSRF], async (req: Request, response: Response) => {
  response.render("signup", { csrftoken: req.session?.csrf });
});

accounts.post(
  "/signup",
  [checkCSRF],
  async (req: Request, response: Response) => {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = hashSync(req.body.password, 8);

    if (user.name && user.email && user.password) {
      return response.json({
        status: "Error",
        message: "name, email and password are required",
      });
    }

    const account = new Accounts();
    const exists = await account.find(user.email);

    if (exists) {
      return response.json({
        status: "Error",
        message: "User with this email already exists!",
      });
    }

    account.create(user);
    return response.json({ status: "OK" });
  }
);

accounts.get("/login", [setCSRF], async (req: Request, response: Response) => {
  response.render("login", { csrftoken: req.session?.csrf });
});

accounts.post("/login", [checkCSRF], async (req: Request, res: Response) => {
  const account = new Accounts();
  const user = await account.find(req.body.email);

  if (!user) {
    return res.json({
      status: "Error",
      message: "User not found!",
    });
  }

  if (!compareSync(req.body.password, user.password)) {
    return res.json({
      status: "Error",
      message: "Invalid Password!",
    });
  }

  if (req.session) {
    req.session.jwt = createJwt({ user_id: user.id });
  }

  return res.json({ status: "OK" });
});
