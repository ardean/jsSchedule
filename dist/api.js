"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const schedules = require("./controllers/schedules");
const cors = require("cors");
const api = express.Router();
api.use(cors());
api.use(bodyParser.json());
api.get("/schedules", schedules.list);
api.post("/schedules", schedules.create);
api.put("/schedules/:id", schedules.update);
api.delete("/schedules/:id", schedules.remove);
exports.default = api;
//# sourceMappingURL=api.js.map