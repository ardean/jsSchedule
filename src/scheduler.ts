import { log } from "util";
import * as ns from "node-schedule";
import * as uniqid from "uniqid";
import * as config from "./config";
import { shutdown, reboot, execute } from "./util";
import Schedule from "./Schedule";

export class Scheduler {
  jobs: { [key: string]: ns.Job } = {};
  config: config.Config;

  async init() {
    this.config = await config.init();
    await this.scheduleAll();
  }

  async scheduleAll() {
    for (const schedule of this.config.schedules) {
      await this.schedule(schedule);
    }

    log(`scheduled ${this.config.schedules.length} job${this.config.schedules.length === 1 ? "" : "s"}`);
  }

  async add(schedule: Schedule, id?: string) {
    schedule._id = id || uniqid();

    this.config.schedules.push(schedule);
    await config.write(this.config);
    this.schedule(schedule);

    return schedule;
  }

  async update(schedule: Schedule) {
    const { _id: id } = schedule;
    await this.remove(id);
    return await this.add(schedule, id);
  }

  async remove(id: string) {
    this.cancel(id);

    const index = this.getIndex(id);
    if (index > -1) this.config.schedules.splice(index, 1);

    await config.write(this.config);
  }

  get(id: string) {
    return this.config.schedules.find(x => x._id === id);
  }

  getIndex(id: string) {
    return this.config.schedules.findIndex(x => x._id === id);
  }

  schedule(schedule: Schedule) {
    const job = ns.scheduleJob(schedule.rule, async () => {
      try {
        switch (schedule.action) {
          case "shutdown":
            await shutdown();
            break;
          case "reboot":
            await reboot();
            break;
          // case "execute":
          //   await execute(schedule.execute);
          //   break;
        }
      } catch (err) {
        console.error(err);
      }
    });

    this.jobs[schedule._id] = job;
  }

  cancelAll() {
    const scheduleIds = Object.keys(this.jobs);
    for (const scheduleId of scheduleIds) {
      this.cancel(scheduleId);
    }
  }

  cancel(id: string) {
    const job = this.jobs[id];
    if (!job) return;

    job.cancel();
    delete this.jobs[id];
  }
}

export default new Scheduler();