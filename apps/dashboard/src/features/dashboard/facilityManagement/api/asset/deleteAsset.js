import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function deleteAsset(id) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.delete(`/subscriber/assets/${id}`, {
         headers: createHeaders(
            token[SUBSCRIBER_KEY]
         ),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
