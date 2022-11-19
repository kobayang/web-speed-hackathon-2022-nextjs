import { User } from "../../model";
import { createConnection } from "../typeorm/connection";

export async function withAuth(req, res) {
  const userId = req.headers["x-app-userid"];
  if (userId !== undefined) {
    const connection = await createConnection();
    const repo = connection.getRepository(User);
    const user = await repo.findOne(userId);
    if (user === undefined) {
      res.status(401).send();
      return;
    }
    req.user = user;
  }
}
