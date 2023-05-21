import express, { Express, Router } from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import { Settings } from "./Settings";

export class Application {
  private _app: Express = express();
  private _settings: Settings = Settings.getInstance();

  constructor() {
    this._app.set("view engine", "ejs");
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(cookieParser());
    this._app.use(cookieSession(this._settings.session));
  }

  registerStatic(dir: string) {
    this._app.use(express.static(dir));
  }

  registerRoutes(url: string, router: Router) {
    this._app.use(url, router);
  }

  start(port: string) {
    this._app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
}
