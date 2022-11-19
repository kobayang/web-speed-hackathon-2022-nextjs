import { User } from "../../../../src/model";
import { withAuth } from "../../../../src/server/middlewares/withAuth";
import { withConnection } from "../../../../src/server/middlewares/withConnection";
import { createConnection } from "../../../../src/server/typeorm/connection";

export default async function handler(req, res) {
  await withAuth(req, res);
  await withConnection(req, res);
  if (res.headersSent) return;

  if (req.user == null) {
    res.status(401).send();
    return;
  }

  const { amount } = req.body;
  if (typeof amount !== "number" || amount <= 0) {
    res.status(400).send();
    return;
  }

  const repo = (await createConnection()).getRepository(User);

  req.user.balance += amount;
  await repo.save(req.user);

  res.status(204).send();
}
