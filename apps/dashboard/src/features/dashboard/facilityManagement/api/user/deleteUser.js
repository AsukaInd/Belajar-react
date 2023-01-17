import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function deleteUser({ userId, clientId }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.delete(
         `/subscriber/clients/${clientId}/client-users/${userId}`,
         {
            headers: createHeaders(
               token[SUBSCRIBER_KEY]
            ),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
