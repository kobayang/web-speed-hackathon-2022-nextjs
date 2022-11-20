import axios from "axios";

export const getRaces = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/races`, {
    responseType: "json",
  });
  return res.data;
};
