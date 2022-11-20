import axios from "axios";

export const getRace = async (uuid) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/races/${uuid}`,
    {
      responseType: "json",
    }
  );
  return res.data;
};
