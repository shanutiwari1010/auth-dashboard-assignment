import axios from "@/config/axios";

export const userLogin = async (data) => {
  return await axios.post("/userLogin", data);
};

export const userSignup = async (data) => {
  return await axios.post("/userRegister", data);
};
