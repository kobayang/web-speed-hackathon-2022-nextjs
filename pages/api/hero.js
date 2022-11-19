import { withAuth } from "../../src/server/middlewares/withAuth";
import { withConnection } from "../../src/server/middlewares/withConnection";

export function getHero() {
  const url = "/assets/images/hero.webp";
  const hash = Math.random().toFixed(10).substring(2);

  return { hash, url };
}

export default async function handler(req, res) {
  await withAuth(req, res);
  await withConnection(req, res);
  if (res.headersSent) return;

  const data = getHero();
  res.send(data);
}
