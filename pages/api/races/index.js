import moment from "moment-timezone";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { BadRequestError, handleErrorToStatusCode } from "../../../src/errors";
import { Race } from "../../../src/model";

import { withAuth } from "../../../src/server/middlewares/withAuth";
import { withConnection } from "../../../src/server/middlewares/withConnection";
import { createConnection } from "../../../src/server/typeorm/connection";

export async function getRaces(query) {
  const since = query.since != null ? moment.unix(query.since) : undefined;
  const until = query.until != null ? moment.unix(query.until) : undefined;

  if (since != null && !since.isValid()) {
    throw new BadRequestError();
  }
  if (until != null && !until.isValid()) {
    throw new BadRequestError();
  }

  const repo = (await createConnection()).getRepository(Race);

  const where = {};
  if (since != null && until != null) {
    Object.assign(where, {
      startAt: Between(
        since.utc().format("YYYY-MM-DD HH:mm:ss"),
        until.utc().format("YYYY-MM-DD HH:mm:ss")
      ),
    });
  } else if (since != null) {
    Object.assign(where, {
      startAt: MoreThanOrEqual(since.utc().format("YYYY-MM-DD HH:mm:ss")),
    });
  } else if (until != null) {
    Object.assign(where, {
      startAt: LessThanOrEqual(since.utc().format("YYYY-MM-DD HH:mm:ss")),
    });
  }

  const races = await repo.find({
    where,
  });

  return { races: JSON.parse(JSON.stringify(races)) };
}

export default async function handler(req, res) {
  await withAuth(req, res);
  await withConnection(req, res);
  if (res.headersSent) return;

  try {
    const data = await getRaces(req.query);
    res.send(data);
  } catch (error) {
    const code = handleErrorToStatusCode(error);
    res.status(code).send();
  }
}
