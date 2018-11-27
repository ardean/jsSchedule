import * as ns from "node-schedule";

export type Interval = "hourly" | "daily" | "weekly" | "monthly" | "yearly";
export type Action = "shutdown" | "reboot"; // TODO: "execute" optional but only with login and ssl

export default interface Schedule {
  _id?: string;
  name?: string;
  interval: Interval;
  rule: ns.RecurrenceSpecObjLit;
  action: Action;
  // execute?: string;
}