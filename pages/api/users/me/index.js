import { User } from "../../../../src/model";
import { withAuth } from "../../../../src/server/middlewares/withAuth";
import { withConnection } from "../../../../src/server/middlewares/withConnection";
import { createConnection } from "../../../../src/server/typeorm/connection";

export default async function handler(req, res) {
  await withAuth(req, res);
  await withConnection(req, res);
  if (res.headersSent) return;

  const connection = await createConnection();
  const repo = connection.getRepository(User);
  if (req.user != null) {
    res.send(req.user);
  } else {
    const user = await repo.save(new User());
    res.send(user);
  }
}
