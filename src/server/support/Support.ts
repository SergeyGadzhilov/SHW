import { OkPacket } from "mysql2";
import { Database } from "../app/Database";
import { ITicket } from "./Ticket";

export class Support {
  public async createTicket(ticket: ITicket) {
    const db = Database.getInstance();
    await db.query<OkPacket>(
      "INSERT INTO ticket (name, email, message) VALUES(?,?,?)",
      [ticket.name, ticket.email, ticket.message]
    );
  }
}
