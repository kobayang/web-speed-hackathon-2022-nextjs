import moment from "moment-timezone";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Race } from "../../../src/model";

import { withAuth } from "../../../src/server/middlewares/withAuth";
import { withConnection } from "../../../src/server/middlewares/withConnection";
import { createConnection } from "../../../src/server/typeorm/connection";

export default async function handler(req, res) {
  await withAuth(req, res);
  await withConnection(req, res);
  if (res.headersSent) return;

  const since =
    req.query.since != null ? moment.unix(req.query.since) : undefined;
  const until =
    req.query.until != null ? moment.unix(req.query.until) : undefined;

  if (since != null && !since.isValid()) {
    res.status(400).send();
    return;
  }
  if (until != null && !until.isValid()) {
    res.status(400).send();
    return;
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

  res.send({ races });
}
