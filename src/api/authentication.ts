import { Request, Response } from "express";

export let createAccount = (req: Request, res: Response) => {
  const fullName: string = req.body.fullName;
  const password: string = req.body.password;
  const email: string = req.body.email;

  if (fullName === undefined || password === undefined || email === undefined) {
    res.status(400).send("Missing parameter");
  }

  res.status(201).send("Account created succesfully");
};
