import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getTypes({ name }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/subscriber/types/${name}`, {
         headers: createHeaders(token[SUBSCRIBER_KEY]),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
