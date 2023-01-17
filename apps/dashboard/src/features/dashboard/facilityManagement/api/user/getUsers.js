import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getUsers({ type = "client-user", page = 1, perPage = 10 }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/subscriber/users`,
         {
            params: {
               page: page + 1,
               per_page: perPage,
               type,
            },
            headers: createHeaders(token[SUBSCRIBER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
