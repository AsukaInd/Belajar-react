import { axiosInstance } from "~/lib/axios";

export async function userRegister(dataRegister) {
   try {
      const { data } = await axiosInstance.post(
         "freelancer/register",
         dataRegister
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}