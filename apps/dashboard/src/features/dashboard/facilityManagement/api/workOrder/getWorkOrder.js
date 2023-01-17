import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getWorkOrder({ id, page, pageSize, dueDateFilter, statusFilter }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/subscriber/reports/work-orders${id ? `/${id}` : ""}`,
         {
            params: {
               page: page + 1,
               per_page: pageSize,
               due_date: dueDateFilter,
               status: statusFilter
            },
            headers: createHeaders(token[SUBSCRIBER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
