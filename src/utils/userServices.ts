import {apiURL} from "./apiServices.ts";

export const getUser = async (userId: string) => {
  try {
    const res = await apiURL.get(`/user/${userId}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};