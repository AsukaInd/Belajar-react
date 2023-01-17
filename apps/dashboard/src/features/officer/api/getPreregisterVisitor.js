import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, OFFICER_KEY } from "~/utils/tokenStorage";

export async function getPreregisterVisitor({ siteId }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/officer/${siteId}/visitor/registered-visitors`,
         {
            headers: createHeaders(token[OFFICER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
