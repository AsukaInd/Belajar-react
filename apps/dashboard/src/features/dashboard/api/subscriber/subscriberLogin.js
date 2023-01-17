import { axiosInstance } from "~/lib/axios";

export async function subscriberLogin(dataLogin) {
   try {
      const { data } = await axiosInstance.post("/subscriber/login", dataLogin);

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
