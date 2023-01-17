import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getAllCity() {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/pi/city`,
         {
            headers: createHeaders(token[SUBSCRIBER_KEY] ?? token[ADMIN_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
