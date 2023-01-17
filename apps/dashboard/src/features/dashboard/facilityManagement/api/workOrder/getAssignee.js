import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY } from "~/utils/tokenStorage";

export async function getAssignee() {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/subscriber/reports/work-orders/assignee`,
         {
            headers: createHeaders(token[SUBSCRIBER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
