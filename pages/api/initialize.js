import { BettingTicket, User } from "../../src/model";
import { withAuth } from "../../src/server/middlewares/withAuth";
import { withConnection } from "../../src/server/middlewares/withConnection";
import { createConnection } from "../../src/server/typeorm/connection";

export default async function handler(req, res) {
  await withAuth(req, res);
  await withConnection(req, res);
  if (res.headersSent) return;

  const connetion = await createConnection();
  // Clear BettingTicket
  await connetion.createQueryRunner().manager.clear(BettingTicket);
  // Clear User
  await connetion.createQueryRunner().manager.clear(User);
  res.status(204).send();
}
