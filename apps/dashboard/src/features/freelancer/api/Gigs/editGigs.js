import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, FREELANCER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { gigsToFormData } from "~/utils/gigsToFormData";

export async function editGigs(editData) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         `/freelancer/freelancers/dashboard/services/${editData.id}?_method=PUT`,
         gigsToFormData(editData),
         // dataGigs,
         {  
            headers: createHeaders(
               token[FREELANCER_KEY] ? token[FREELANCER_KEY] : token[ADMIN_KEY]
            ),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}