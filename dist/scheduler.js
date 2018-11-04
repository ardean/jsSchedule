"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const ns = require("node-schedule");
const uniqid = require("uniqid");
const config = require("./config");
const util_2 = require("./util");
class Scheduler {
    constructor() {
        this.jobs = {};
    }
    async init() {
        this.config = await config.init();
        await this.scheduleAll();
    }
    async scheduleAll() {
        for (const schedule of this.config.schedules) {
            await this.schedule(schedule);
        }
        util_1.log(`scheduled ${this.config.schedules.length} job${this.config.schedules.length === 1 ? "" : "s"}`);
    }
    async add(schedule, id) {
        schedule._id = id || uniqid();
        this.config.schedules.push(schedule);
        await config.write(this.config);
        this.schedule(schedule);
        return schedule;
    }
    async update(schedule) {
        const { _id: id } = schedule;
        await this.remove(id);
        return await this.add(schedule, id);
    }
    async remove(id) {
        this.cancel(id);
        const index = this.getIndex(id);
        if (index > -1)
            this.config.schedules.splice(index, 1);
        await config.write(this.config);
    }
    get(id) {
        return this.config.schedules.find(x => x._id === id);
    }
    getIndex(id) {
        return this.config.schedules.findIndex(x => x._id === id);
    }
    schedule(schedule) {
        const job = ns.scheduleJob(schedule.rule, async () => {
            try {
                switch (schedule.action) {
                    case "shutdown":
                        await util_2.shutdown();
                        break;
                    case "reboot":
                        await util_2.reboot();
                        break;
                    case "execute":
                        await util_2.execute(schedule.execute);
                        break;
                }
            }
            catch (err) {
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
    cancel(id) {
        const job = this.jobs[id];
        if (!job)
            return;
        job.cancel();
        delete this.jobs[id];
    }
}
exports.Scheduler = Scheduler;
exports.default = new Scheduler();
//# sourceMappingURL=scheduler.js.map