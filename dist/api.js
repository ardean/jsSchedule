"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const ScheduleController = require("./controllers/ScheduleController");
const CommandController = require("./controllers/CommandController");
const api = express.Router();
api.use(cors());
api.use(bodyParser.json());
api.get("/schedules", ScheduleController.list);
api.post("/schedules", ScheduleController.create);
api.put("/schedules/:id", ScheduleController.update);
api.delete("/schedules/:id", ScheduleController.remove);
api.post("/shutdown", CommandController.shutdown);
api.post("/reboot", CommandController.reboot);
exports.default = api;
//# sourceMappingURL=api.js.map