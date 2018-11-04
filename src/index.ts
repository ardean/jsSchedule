import * as express from "express";
import scheduler from "./scheduler";
import * as path from "path";
import { log } from "util";
import api from "./api";

const PORT = 2222;
const APP_PATH = path.resolve(path.dirname(require.resolve("jsschedule-app/package.json")), "build");

const app = express();
app.use(express.static(APP_PATH));
app.disable("x-powered-by");
app.use("/api", api);
app.listen(PORT, async () => {
  await scheduler.init();
  log("jsschedule listening on port " + PORT);
});