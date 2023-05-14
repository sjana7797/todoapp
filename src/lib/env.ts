import { cleanEnv, str, email, json, num } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num(),
  MONGO_URI: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  JWT_SECRET: str(),
  FRONTEND_URL: str(),
});

export default env;
