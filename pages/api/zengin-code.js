import zenginCode from "zengin-code";

const bankList = Object.entries(zenginCode).map(([code, { name }]) => ({
  code,
  name,
}));

export default async function handler(req, res) {
  res.status(200).json({ zenginCode, bankList });
}
