import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getProductSize() {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/pi/product-inspection-productsize`,
         {
            headers: createHeaders(token[SUBSCRIBER_KEY] ?? token[ADMIN_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
