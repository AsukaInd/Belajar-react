import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY } from "~/utils/tokenStorage";

export async function getPreregisterVisitor({ id, page, perPage, sort_order, sort_by, search, filter, filter_by }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/subscriber/registered-visitor${id ? `/${id}` : ""}`,
         {
            params: {
               page: page + 1,
               per_page: perPage,
               filter_by: filter ? filter_by : null,
               sort_order,
               sort_by,
               search,
               filter
            },
            headers: createHeaders(token[SUBSCRIBER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
