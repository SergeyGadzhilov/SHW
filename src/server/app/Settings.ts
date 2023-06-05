import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";
import Pool from "mysql2/typings/mysql/lib/Pool";

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

  get db(): Pool.PoolOptions {
    return {
      connectionLimit: process.env.DB_CONNECTIONS_LIMIT
        ? parseInt(process.env.DB_CONNECTIONS_LIMIT)
        : 10,
      host: process.env.DB_HOST ? process.env.DB_HOST : "",
      user: process.env.DB_USER ? process.env.DB_USER : "",
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "",
      database: process.env.DB_NAME ? process.env.DB_NAME : "shshare",
      port: 3306,
    };
  }

  get session(): CookieSessionInterfaces.CookieSessionOptions {
    return {
      name: "session",
      secret: process.env.SESSION_SECRET ? process.env.SESSION_SECRET : "",
      maxAge: process.env.SESSION_MAX_AGE
        ? parseInt(process.env.SESSION_MAX_AGE)
        : 86400,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    };
  }

  get port(): string {
    return process.env.PORT ? process.env.PORT : "8000";
  }

  get jwtSecret(): string {
    return process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
  }

  get jwtOptions(): SignOptions {
    return {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    };
  }
}
