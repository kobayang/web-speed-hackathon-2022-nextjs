import axios from "axios";

export const getRaces = async (/** @type {string} */ url) => {
  const res = await axios.get(url, { responseType: "json" });
  return res.data;
};
