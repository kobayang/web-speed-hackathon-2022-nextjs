import { handleErrorToStatusCode, NotFoundError } from "../../../../src/errors";
import { Race } from "../../../../src/model";
import { withAuth } from "../../../../src/server/middlewares/withAuth";
import { withConnection } from "../../../../src/server/middlewares/withConnection";
import { createConnection } from "../../../../src/server/typeorm/connection";

export async function getRace(query) {
  const { raceId } = query;
  const repo = (await createConnection()).getRepository(Race);
  const race = await repo.findOne(raceId, {
    relations: ["entries", "entries.player", "trifectaOdds"],
  });

  if (race === undefined) {
    throw NotFoundError();
  }
  return JSON.parse(JSON.stringify(race));
}

export default async function handler(req, res) {
  await withAuth(req, res);
  await withConnection(req, res);
  if (res.headersSent) return;
  try {
    const race = getRace(req.query);
    res.send(race);
  } catch (error) {
    const statusCode = handleErrorToStatusCode(error);
    res.status(404).send();
  }
}
