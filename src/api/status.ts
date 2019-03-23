import { Status } from "../models/status.model";
import { Request, Response } from "express";

export const getStatus = (req: Request, res: Response) => {
  res.send(new Status("Up"));
};
