import { axiosInstance } from "~/lib/axios";

export async function officerLogin(dataLogin) {
   try {
      const { data } = await axiosInstance.post("/officer/login", dataLogin);

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
