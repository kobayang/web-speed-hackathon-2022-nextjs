import axios from "axios";

export default async function handler(req, res) {
  await axios.request({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/api/initialize`,
    headers: {
      "content-type": "application/json",
    },
  });
  res.status(204).send();
}
