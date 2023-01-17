import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, OFFICER_KEY } from "~/utils/tokenStorage";
import { toFormData } from "~/utils/toFormData";

export async function createQuestionInspection(dataInspection) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         "/pi/product-inspection-chp-question",
         dataInspection,
         {
            headers: createHeaders(
               token[OFFICER_KEY]
            ),
         }
      );
      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}