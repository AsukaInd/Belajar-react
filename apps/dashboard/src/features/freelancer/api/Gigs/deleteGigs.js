import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, FREELANCER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function deleteGigs(id) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.delete(`/freelancer/freelancers/dashboard/services/${id}`, {
         headers: createHeaders(
            token[FREELANCER_KEY] ? token[FREELANCER_KEY] : token[ADMIN_KEY]
         ),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}