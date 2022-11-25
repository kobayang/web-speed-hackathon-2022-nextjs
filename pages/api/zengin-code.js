import zenginCode from "zengin-code";

export const config = {
  runtime: "experimental-edge",
};

const bankList = Object.entries(zenginCode).map(([code, { name }]) => ({
  code,
  name,
}));

export default async function handler() {
  return new Response(JSON.stringify({ zenginCode, bankList }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
