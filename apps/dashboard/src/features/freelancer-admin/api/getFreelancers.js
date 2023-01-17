import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, FREELANCER_ADMIN_KEY } from "~/utils/tokenStorage";

export async function getFreelancers({ page, perPage }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/admin/freelancers`, {
         params: {
            page: page + 1,
            per_page: perPage
         },
         headers: createHeaders(token[FREELANCER_ADMIN_KEY]),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}
