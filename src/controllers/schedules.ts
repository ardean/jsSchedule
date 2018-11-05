import { Request, Response, NextFunction } from "express";
import scheduler from "../scheduler";
import { createRule } from "../util";
import Schedule from "../Schedule";

export const list = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(scheduler.config.schedules);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      interval = "daily",
      action = "shutdown",
      execute
    } = req.body;

    let { rule } = req.body;
    rule = createRule(interval, rule);
    if (!rule) throw new Error("invalid_rule");

    let schedule: Schedule = {
      name,
      interval,
      rule,
      action,
      execute
    };

    schedule = await scheduler.add(schedule);

    res.json(schedule);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const {
      name,
      interval = "daily",
      action = "shutdown",
      execute
    } = req.body;
    if (!id) throw new Error("id_required");

    let { rule } = req.body;
    rule = createRule(interval, rule);
    if (!rule) throw new Error("invalid_rule");

    const old = scheduler.get(id);
    if (!old) throw new Error("schedule_not_exists");

    let schedule: Schedule = {
      ...old,
      name,
      interval,
      rule,
      action,
      execute
    };

    schedule = await scheduler.update(schedule);

    res.json(schedule);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("id_required");

    await scheduler.remove(id);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};