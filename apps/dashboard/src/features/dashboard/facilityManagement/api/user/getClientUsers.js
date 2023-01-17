import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getClientUsers({ clientId }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/subscriber/clients/${clientId}/client-users`,
         {
            headers: createHeaders(token[SUBSCRIBER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
