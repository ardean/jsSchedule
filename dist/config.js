"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const CONFIG_PATH = "./config.json";
const INITIAL_CONFIG = { schedules: [] };
exports.init = async () => {
    const config = await exports.read();
    if (!config)
        return await exports.write(INITIAL_CONFIG);
    return config;
};
exports.write = async (config) => {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    return copyConfig(config);
};
exports.read = async () => {
    if (!fs.existsSync(CONFIG_PATH))
        return false;
    const config = fs.readFileSync(CONFIG_PATH, { encoding: "utf-8" });
    return JSON.parse(config);
};
const copyConfig = (config) => JSON.parse(JSON.stringify(config));
//# sourceMappingURL=config.js.map