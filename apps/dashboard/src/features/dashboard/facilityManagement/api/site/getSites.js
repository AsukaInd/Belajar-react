import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY } from "~/utils/tokenStorage";

export async function getSites({ id, page, perPage, sort_order, sort_by, search, filter }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/subscriber/sites${id ? `/${id}` : ""}`, {
         params: {
            page: search || filter ? 0 : page + 1,
            per_page: perPage,
            filter_by: filter ? 'name' : null,
            sort_order,
            sort_by,
            search,
            filter
         },
         headers: createHeaders(token[SUBSCRIBER_KEY]),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
