import express, { Express, Router } from "express";

export class Application {
  private _app: Express = express();

  constructor() {
    this._app.set("view engine", "ejs");
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
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
