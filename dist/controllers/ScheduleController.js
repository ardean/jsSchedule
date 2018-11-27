"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scheduler_1 = require("../scheduler");
const util_1 = require("../util");
exports.list = (req, res, next) => {
    try {
        res.json(scheduler_1.default.config.schedules);
    }
    catch (err) {
        next(err);
    }
};
exports.create = async (req, res, next) => {
    try {
        const { name, interval = "daily", action = "shutdown", } = req.body;
        let { rule } = req.body;
        rule = util_1.createRule(interval, rule);
        if (!rule)
            throw new Error("invalid_rule");
        let schedule = {
            name,
            interval,
            rule,
            action,
        };
        schedule = await scheduler_1.default.add(schedule);
        res.json(schedule);
    }
    catch (err) {
        next(err);
    }
};
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, interval = "daily", action = "shutdown", } = req.body;
        if (!id)
            throw new Error("id_required");
        let { rule } = req.body;
        rule = util_1.createRule(interval, rule);
        if (!rule)
            throw new Error("invalid_rule");
        const old = scheduler_1.default.get(id);
        if (!old)
            throw new Error("schedule_not_exists");
        let schedule = Object.assign({}, old, { name,
            interval,
            rule,
            action });
        schedule = await scheduler_1.default.update(schedule);
        res.json(schedule);
    }
    catch (err) {
        next(err);
    }
};
exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id)
            throw new Error("id_required");
        await scheduler_1.default.remove(id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=ScheduleController.js.map