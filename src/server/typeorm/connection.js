import * as typeorm from "typeorm";

import {
  BettingTicket,
  OddsItem,
  Player,
  Race,
  RaceEntry,
  User,
} from "../../model/index.js";
import { DATABASE_PATH } from "../paths.js";

let connectionReadyPromise = null;

const createConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = typeorm.getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      const connection = await typeorm.createConnection({
        database: DATABASE_PATH,
        entities: [
          User.schema,
          OddsItem.schema,
          Player.schema,
          RaceEntry.schema,
          Race.schema,
          BettingTicket.schema,
        ],
        synchronize: false,
        type: "sqlite",
      });

      return connection;
    })();
  }

  return connectionReadyPromise;
};

export { createConnection };
