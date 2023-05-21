import { OkPacket, RowDataPacket } from "mysql2";
import { Database } from "../app/Database";
import { User } from "./User";
import { resolve } from "path";

export interface IUser extends RowDataPacket {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export class Accounts {
  async create(user: User) {
    const db = Database.getInstance();
    await db.query<OkPacket>(
      "INSERT INTO users (name, email, password) VALUES(?,?,?)",
      [user.name, user.email, user.password]
    );
  }

  async find(email: string): Promise<User | null> {
    const db = Database.getInstance();
    const result = await db.query<IUser[]>(
      "select * from users where email=?",
      [email]
    );

    if (result.length > 0) {
      const user = new User();
      user.id = result[0].id || 0;
      user.name = result[0].name;
      user.email = result[0].email;
      user.password = result[0].password;
      return user;
    } else {
      return null;
    }
  }
}
