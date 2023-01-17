import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { workOrderToFormData } from './workOrderToFormData'

export async function addWorkOrder(dataWorkOrder) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         "/subscriber/reports/work-orders",
         workOrderToFormData({ ...dataWorkOrder, start_date: new Date() }),
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
