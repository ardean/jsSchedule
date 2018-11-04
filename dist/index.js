"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const scheduler_1 = require("./scheduler");
const path = require("path");
const util_1 = require("util");
const api_1 = require("./api");
const PORT = 2222;
const APP_PATH = path.resolve(path.dirname(require.resolve("jsschedule-app/package.json")), "build");
const app = express();
app.use(express.static(APP_PATH));
app.disable("x-powered-by");
app.use("/api", api_1.default);
app.listen(PORT, async () => {
    await scheduler_1.default.init();
    util_1.log("jsschedule listening on port " + PORT);
});
//# sourceMappingURL=index.js.map