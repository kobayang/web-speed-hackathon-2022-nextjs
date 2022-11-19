import { BettingTicket, User } from "../../../../src/model";
import { withAuth } from "../../../../src/server/middlewares/withAuth";
import { withConnection } from "../../../../src/server/middlewares/withConnection";
import { createConnection } from "../../../../src/server/typeorm/connection";

export default async function handler(req, res) {
  await withAuth(req, res);
  await withConnection(req, res);
  if (res.headersSent) return;

  const { raceId } = req.query;

  if (req.method === "GET") {
    if (req.user == null) {
      res.status(403).send();
      return;
    }

    const repo = (await createConnection()).getRepository(BettingTicket);
    const bettingTickets = await repo.find({
      where: {
        race: {
          id: raceId,
        },
        user: {
          id: req.user.id,
        },
      },
    });

    res.send({
      bettingTickets,
    });
  }

  if (req.method === "POST") {
    if (req.user == null) {
      res.status(403).send();
      return;
    }

    if (req.user.balance < 100) {
      res.status(412).send();
      return;
    }

    if (typeof req.body.type !== "string") {
      res.status(400).send();
      return;
    }

    if (
      !Array.isArray(req.body.key) ||
      req.body.key.some((n) => typeof n !== "number")
    ) {
      res.status(400).send();
      return;
    }

    const bettingTicketRepo = (await createConnection()).getRepository(
      BettingTicket
    );
    const bettingTicket = await bettingTicketRepo.save(
      new BettingTicket({
        key: req.body.key,
        race: {
          id: raceId,
        },
        type: req.body.type,
        user: {
          id: req.user.id,
        },
      })
    );

    const userRepo = (await createConnection()).getRepository(User);
    req.user.balance -= 100;
    await userRepo.save(req.user);

    res.send(bettingTicket);
  }
}
