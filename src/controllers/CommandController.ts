import { Request, Response, NextFunction } from "express";
import { shutdown as executeShutdown, reboot as executeReboot } from "../util";

export const shutdown = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await executeShutdown();

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export const reboot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await executeReboot();

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};