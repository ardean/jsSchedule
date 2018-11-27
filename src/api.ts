import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as ScheduleController from "./controllers/ScheduleController";
import * as CommandController from "./controllers/CommandController";

const api = express.Router();
api.use(cors());
api.use(bodyParser.json());

api.get("/schedules", ScheduleController.list);
api.post("/schedules", ScheduleController.create);
api.put("/schedules/:id", ScheduleController.update);
api.delete("/schedules/:id", ScheduleController.remove);

api.post("/shutdown", CommandController.shutdown);
api.post("/reboot", CommandController.reboot);

export default api;