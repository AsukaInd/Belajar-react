import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, OFFICER_KEY } from "~/utils/tokenStorage";
import { objectToFormData } from "~/utils/objectToFormData";

export async function visitorIn({ siteId, dataReport }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/officer/${siteId}/visitor/in`,
         objectToFormData(dataReport),
         {
            headers: createHeaders(token[OFFICER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
