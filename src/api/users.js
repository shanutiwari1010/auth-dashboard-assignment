import axios from "@/config/axios";

export const getUsersList = async () => {
  return await axios.get("/userList");
};

export const updateUserProfile = async (data) => {
  return await axios.post("/profileUpdate", data);
};
