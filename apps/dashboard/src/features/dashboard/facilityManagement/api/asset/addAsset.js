import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { toFormData } from "~/utils/toFormData";

export async function addAsset(dataAsset) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         "/subscriber/assets",
         toFormData(dataAsset),
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
