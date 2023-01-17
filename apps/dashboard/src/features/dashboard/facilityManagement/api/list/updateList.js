import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function updateList({ dataList, name }) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.put(
         `/subscriber/types/${name}/lists/${dataList.id}`,
         dataList,
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
