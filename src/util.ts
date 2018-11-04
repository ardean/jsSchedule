import * as ns from "node-schedule";
import { exec } from "child_process";
import { log } from "util";
import { Interval } from "./Schedule";

export const createRule = (interval: Interval, values) => {
  let rule: ns.RecurrenceSpecObjLit;

  if (interval === "hourly") {
    rule = {
      second: 0,
      minute: values.minute || 0
    };
  } else if (interval === "daily") {
    rule = {
      second: 0,
      minute: values.minute || 0,
      hour: values.hour || 0
    };
  } else if (interval === "weekly") {
    rule = {
      second: 0,
      minute: values.minute || 0,
      hour: values.hour || 0,
      dayOfWeek: values.dayOfWeek || 1
    };
  } else if (interval === "monthly") {
    rule = {
      second: 0,
      minute: values.minute || 0,
      hour: values.hour || 0,
      date: values.date || 1
    };
  } else if (interval === "yearly") {
    rule = {
      second: 0,
      minute: values.minute || 0,
      hour: values.hour || 0,
      date: values.date || 1,
      month: values.month || 1
    };
  }

  return rule;
};

export const shutdown = async () => {
  if (process.platform === "linux") return await execute("systemctl poweroff");
  if (process.platform === "win32") return await execute("shutdown /h /t 0");
  if (process.platform === "darwin") return await execute("shutdown -h now");
}

export const reboot = async () => {
  if (process.platform === "linux") return await execute("systemctl reboot");
  if (process.platform === "win32") return await execute("shutdown /r /t 0");
  if (process.platform === "darwin") return await execute("shutdown -r now");
}

export const execute = (command: string) => {
  log(`execute: ${command}`);

  return new Promise<string>((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}