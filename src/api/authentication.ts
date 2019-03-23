import { Request, Response } from "express";
import * as Account from "../schemas/account.schema";
import { Document } from "mongoose";
import * as jwt from "jsonwebtoken";

const jwtSecretKey = "44a0a45f31cf8122651e28710a43530e";

export let createAccount = async (req: Request, res: Response) => {
  const fullName: string = req.body.fullName;
  const password: string = req.body.password;
  const email: string = req.body.email;

  if (fullName === undefined || password === undefined || email === undefined) {
    res.status(400).send("Missing parameter");
    return;
  }

  if (await isEmailUsed(email)) {
    res.status(500).send("Email already in use");
    return;
  }
  Account.default.create({ fullName, email, password });

  res.status(201).send("Account created succesfully");
};

async function isEmailUsed(email: string) {
  const usersWithEmail: Document[] = await Account.default.find({ email }).exec();
  return usersWithEmail.length > 0;
}

export let authenticate = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  if (email === undefined || password === undefined) {
    res.status(400).send("Missing parameter");
    return;
  }

  const user: Document = await Account.default.findOne({ email }).select("fullName").exec();
  if (user === null) {
    res.status(403).send("Could not authenticate");
    return;
  }

  const token: string = jwt.sign({ email, fullName: user.get("fullName") }, jwtSecretKey);

  res.send({ accessToken: token });
};
