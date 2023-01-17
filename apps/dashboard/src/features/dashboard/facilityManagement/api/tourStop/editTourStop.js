import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY } from "~/utils/tokenStorage";
import { toFormData } from "../../../../../utils/toFormData";

export async function editTourStop(editData) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/subscriber/tour-stops/${editData.id}`,
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
