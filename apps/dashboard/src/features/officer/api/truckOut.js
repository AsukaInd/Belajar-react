import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, OFFICER_KEY } from "~/utils/tokenStorage";

export async function truckOut({ siteId, dataTruckOut, id }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/officer/${siteId}/vehicle/out/${id}`,
         dataTruckOut,
         {
            headers: createHeaders(token[OFFICER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
