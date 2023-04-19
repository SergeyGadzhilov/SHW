import dotenv from "dotenv";

export class Settings {
  private static _instanse: Settings;

  private constructor() {
    dotenv.config();
  }

  public static getInstance(): Settings {
    if (!Settings._instanse) {
      Settings._instanse = new Settings();
    }
    return Settings._instanse;
  }

  get port(): string {
    return process.env.PORT ? process.env.PORT : "8000";
  }
}
