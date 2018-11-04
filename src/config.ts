import * as fs from "fs";
import Schedule from "./Schedule";

const CONFIG_PATH = "./config.json";

const INITIAL_CONFIG: Config = { schedules: [] };

export interface Config {
  schedules: Schedule[];
}

export const init = async (): Promise<Config> => {
  const config = await read();
  if (!config) return await write(INITIAL_CONFIG);
  return config;
};

export const write = async (config: Config) => {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  return copyConfig(config);
};

export const read = async () => {
  if (!fs.existsSync(CONFIG_PATH)) return false;

  const config = fs.readFileSync(CONFIG_PATH, { encoding: "utf-8" });
  return JSON.parse(config) as Config;
};

const copyConfig = (config: Config) => JSON.parse(JSON.stringify(config)) as Config;