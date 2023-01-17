import { axiosInstance } from "~/lib/axios";

export async function subscriberRegister(dataRegister) {
   try {
      const { data } = await axiosInstance.post(
         "/subscriber/register",
         dataRegister
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
