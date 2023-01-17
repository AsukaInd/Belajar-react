import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function deleteTourStop({ id, isBulkDelete, ids }) {
   const token = tokenStorage.getTokens();

   const deletById = `/subscriber/tour-stops/${id}`
   const bulkDelete = `/subscriber/tour-stops/delete`

   try {

      let axiosDelete;

      const headers = createHeaders(
         token[SUBSCRIBER_KEY]
      )

      if (isBulkDelete) {
         await axiosInstance.post(`/subscriber/tour-stops/delete`, { ids: Object.keys(ids) }, { headers })
      } else {
         await axiosInstance.delete(`/subscriber/tour-stops/${id}`, { headers });
      }

      return axiosDelete?.data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
