import { Request, Response } from "express";
import * as Account from "../schemas/account.schema";
import { Document } from "mongoose";

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
