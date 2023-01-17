import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { toFormData } from "~/utils/toFormData";

export async function editVendor(editData) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/subscriber/vendors/${editData.id}`,
         toFormData(editData),
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
