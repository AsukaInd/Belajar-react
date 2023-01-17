import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, OFFICER_KEY } from "~/utils/tokenStorage";

export async function getChapter() {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/pi/product-checklist-chp`, {
         headers: createHeaders(token[OFFICER_KEY]),
      });
      
      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}

export async function getChapterQuestion() {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(`/pi/product-checklist-qst`, {
         headers: createHeaders(token[OFFICER_KEY]),
      });
      
      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}