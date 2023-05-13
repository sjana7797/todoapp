import { cleanEnv, str, email, json, num } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num(),
  MONGO_URI: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
});

export default env;
