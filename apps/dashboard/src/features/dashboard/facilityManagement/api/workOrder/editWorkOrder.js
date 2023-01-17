import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { workOrderToFormData } from './workOrderToFormData'

export async function editWorkOrder(editData) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/subscriber/reports/work-orders/${editData.id}`,
         workOrderToFormData(editData),
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
