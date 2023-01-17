import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getRoles() {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/subscriber/clients/roles`, {
         headers: createHeaders(token[SUBSCRIBER_KEY]),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
