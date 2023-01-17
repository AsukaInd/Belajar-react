import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, OFFICER_KEY } from "~/utils/tokenStorage";

export async function getInspection() {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/pi/product-inspection`, {
         headers: createHeaders(token[OFFICER_KEY]),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
