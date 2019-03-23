import { Status } from "../models/status.model";
import { Request, Response } from "express";

export let getStatus = (req: Request, res: Response) => {
  res.send(new Status("Up"));
};
