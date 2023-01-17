import { axiosInstance } from "~/lib/axios";

export async function freelancerLogin(dataLogin) {
   try {
      const { data } = await axiosInstance.post("freelancer/login", dataLogin);
      const username = data.data.username;
      localStorage.setItem("username", username);
      return data;
    } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}