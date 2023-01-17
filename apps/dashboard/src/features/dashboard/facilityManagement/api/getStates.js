import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY } from "~/utils/tokenStorage";

export async function getStates({ country }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/subscriber/state`, {
         headers: createHeaders(token[SUBSCRIBER_KEY]),
         params: {
            country
         }
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
