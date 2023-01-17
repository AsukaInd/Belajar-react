import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, FREELANCER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getGigs({ page, perPage }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         "/freelancer/freelancers/dashboard/services",
         {
            params: {
               page: page + 1,
               per_page: perPage
            },
            headers: createHeaders(token[FREELANCER_KEY]),
         }
      );

      return data?.data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}