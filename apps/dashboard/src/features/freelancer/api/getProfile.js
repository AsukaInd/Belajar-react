import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, FREELANCER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getProfile() {
   try {
      const token = tokenStorage.getTokens();
      const username = localStorage.getItem("username")
      const { data } = await axiosInstance.get(`/freelancer/user/${username}`, {
         headers: createHeaders(token[FREELANCER_KEY]),
      });

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}