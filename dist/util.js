"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const util_1 = require("util");
exports.createRule = (interval, values) => {
    let rule;
    if (interval === "hourly") {
        rule = {
            second: 0,
            minute: values.minute || 0
        };
    }
    else if (interval === "daily") {
        rule = {
            second: 0,
            minute: values.minute || 0,
            hour: values.hour || 0
        };
    }
    else if (interval === "weekly") {
        rule = {
            second: 0,
            minute: values.minute || 0,
            hour: values.hour || 0,
            dayOfWeek: values.dayOfWeek || 1
        };
    }
    else if (interval === "monthly") {
        rule = {
            second: 0,
            minute: values.minute || 0,
            hour: values.hour || 0,
            date: values.date || 1
        };
    }
    else if (interval === "yearly") {
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
exports.shutdown = async () => {
    if (process.platform === "linux")
        return await exports.execute("shutdown -h now");
    if (process.platform === "win32")
        return await exports.execute("shutdown /h /t 0");
    if (process.platform === "darwin")
        return await exports.execute("shutdown -h now");
};
exports.reboot = async () => {
    if (process.platform === "linux")
        return await exports.execute("shutdown -r now");
    if (process.platform === "win32")
        return await exports.execute("shutdown /r /t 0");
    if (process.platform === "darwin")
        return await exports.execute("shutdown -r now");
};
exports.execute = (command) => {
    util_1.log(`execute: ${command}`);
    return new Promise((resolve, reject) => {
        child_process_1.exec(command, (err, stdout, stderr) => {
            if (err)
                return reject(err);
            resolve(stdout);
        });
    });
};
//# sourceMappingURL=util.js.map