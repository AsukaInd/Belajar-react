import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getAsset({ id, page, perPage }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/subscriber/assets${id ? `/${id}` : ""}`,
         {
            params: {
               page: page + 1,
               per_page: perPage
            },
            headers: createHeaders(token[SUBSCRIBER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
