import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5500";

const globalConfig = {
  header: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function getComments(post_id) {
  let config = {
    ...globalConfig,
    method: "GET",
    url: `${API_URL}/comments`,
    params: {
      post_id,
    },
  };
  const res = await axios(config);
  return res.data;
}

export async function makeComments(data) {
  let config = {
    ...globalConfig,
    method: "POST",
    url: `${API_URL}/comments`,
    data,
  };
  const res = await axios(config);
  return res.data;
}
