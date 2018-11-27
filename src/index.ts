import api from "./api";
import { log } from "util";
import * as path from "path";
import * as express from "express";
import scheduler from "./scheduler";
import * as fallback from "express-history-api-fallback";

const PORT = 2222;
const APP_PATH = path.resolve(path.dirname(require.resolve("jsschedule-app/package.json")), "build");

const app = express();
app.use(express.static(APP_PATH));
app.disable("x-powered-by");
app.use("/api", api);
app.use(fallback(`${APP_PATH}/index.html`));
app.listen(PORT, async () => {
  await scheduler.init();
  log("jsschedule listening on port " + PORT);
});