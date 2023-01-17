import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { preregisterToFormData } from "./preregisterToFormData";

export async function addPreregisterVisitor(visitorData) {
   const token = tokenStorage.getTokens();

   const { data } = await axiosInstance.post(
      `/subscriber/registered-visitor`,
      preregisterToFormData(visitorData, { isUpdate: false }),
      {
         headers: createHeaders(
            token[SUBSCRIBER_KEY]
         ),
      }
   );

   return data;
}
