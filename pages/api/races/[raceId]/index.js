import { Race } from "../../../../src/model";
import { withAuth } from "../../../../src/server/middlewares/withAuth";
import { withConnection } from "../../../../src/server/middlewares/withConnection";
import { createConnection } from "../../../../src/server/typeorm/connection";

export default async function handler(req, res) {
  await withAuth(req, res);
  await withConnection(req, res);
  if (res.headersSent) return;

  const { raceId } = req.query;
  const repo = (await createConnection()).getRepository(Race);

  const race = await repo.findOne(raceId, {
    relations: ["entries", "entries.player", "trifectaOdds"],
  });

  if (race === undefined) {
    res.status(404).send();
    return;
  }

  res.send(race);
}
