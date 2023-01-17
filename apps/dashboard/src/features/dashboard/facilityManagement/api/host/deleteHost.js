import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY } from "~/utils/tokenStorage";

export async function deleteHost({ id, site_id }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.delete(
         `/subscriber/hosts/${id}`,
         {
            params: {
               site_id
            },
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
