import {
  createPool,
  OkPacket,
  Pool,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";
import { Settings } from "./Settings";

export type QueryResult =
  | RowDataPacket[][]
  | RowDataPacket[]
  | OkPacket
  | OkPacket[]
  | ResultSetHeader;

export class Database {
  private _pool?: Pool;
  private static _instance: Database;
  private _settings: Settings = Settings.getInstance();

  private constructor() {
    try {
      this._pool = createPool(this._settings.db);
    } catch (err) {
      console.error(`Error initialising connection to the db: ${err}`);
    }
  }

  public query<T extends QueryResult>(
    query: string,
    params: string[]
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        this._pool?.query<T>(query, params, (err, result) =>
          err ? reject(err) : resolve(result)
        );
      } catch (err) {
        console.error(`Error executing sql query: ${err}`);
        reject(err);
      }
    });
  }

  public static getInstance(): Database {
    if (!Database._instance) {
      Database._instance = new Database();
    }
    return Database._instance;
  }
}
