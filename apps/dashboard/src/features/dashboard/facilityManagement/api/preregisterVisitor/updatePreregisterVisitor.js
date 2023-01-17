import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { preregisterToFormData } from "./preregisterToFormData";

export async function updatePreregisterVisitor(updateVisitorData) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/subscriber/registered-visitor/${updateVisitorData.id}`,
         preregisterToFormData(updateVisitorData, { isUpdate: true }),
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
