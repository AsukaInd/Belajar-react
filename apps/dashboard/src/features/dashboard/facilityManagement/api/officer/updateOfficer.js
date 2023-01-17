import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function updateOfficer(updateData) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.put(
         `/subscriber/officers/${updateData.id}`,
         updateData,
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
