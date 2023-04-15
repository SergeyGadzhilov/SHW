import dotenv from "dotenv";

export class Settings {
  constructor() {
    dotenv.config();
  }

  get port(): string {
    return process.env.PORT ? process.env.PORT : "8000";
  }
}
