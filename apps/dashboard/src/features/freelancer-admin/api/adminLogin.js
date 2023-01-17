import { axiosInstance } from "~/lib/axios";

export async function adminLogin(dataLogin) {
   try {
      const { data } = await axiosInstance.post("/admin/login", dataLogin);

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}