import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function deleteMember({ id }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.delete(`/subscriber/members/${id}`, {
         headers: createHeaders(
            token[SUBSCRIBER_KEY]
         ),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
