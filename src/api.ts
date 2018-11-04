import * as express from "express";
import * as bodyParser from "body-parser";
import * as schedules from "./controllers/schedules";
import * as cors from "cors";

const api = express.Router();
api.use(cors());
api.use(bodyParser.json());

api.get("/schedules", schedules.list);
api.post("/schedules", schedules.create);
api.put("/schedules/:id", schedules.update);
api.delete("/schedules/:id", schedules.remove);

export default api;