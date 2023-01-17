import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getReports({ name, page, pageSize }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/subscriber/reports/${name}`, {
         params: {
            page: page + 1,
            per_page: pageSize
         },
         headers: createHeaders(token[SUBSCRIBER_KEY]),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
