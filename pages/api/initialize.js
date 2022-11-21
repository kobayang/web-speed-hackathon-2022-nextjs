import axios from "axios";
import Cors from "cors";

// CORS のミドルウェアを初期化
const cors = Cors({});

// 後続の処理を行う前にミドルウェアの実行を待ち、
// また、ミドルウェアでエラーが発生したときエラーを投げるためのヘルパーメソッド
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/api/initialize`, {
      "content-type": "application/json",
    });
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(204).send();
  }
}
