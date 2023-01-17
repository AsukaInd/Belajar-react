import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, OFFICER_KEY } from "~/utils/tokenStorage";

export async function getTruckIn({ siteId }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/officer/${siteId}/vehicle/in`, {
         headers: createHeaders(token[OFFICER_KEY]),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
