import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, OFFICER_KEY } from "~/utils/tokenStorage";
import { objectToFormData } from "~/utils/objectToFormData";

export async function createReport({ siteId, name, dataReport }) {
   const token = tokenStorage.getTokens();
   try {
      const { data } = await axiosInstance.post(
         `/officer/${siteId}/${name}`,
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
