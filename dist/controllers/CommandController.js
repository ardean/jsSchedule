"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
exports.shutdown = async (req, res, next) => {
    try {
        await util_1.shutdown();
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
};
exports.reboot = async (req, res, next) => {
    try {
        await util_1.reboot();
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=CommandController.js.map