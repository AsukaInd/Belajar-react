import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function updateMember({ updateMemberData }) {
   const token = tokenStorage.getTokens();

   const formDataMember = new FormData();

   Object.entries(updateMemberData).forEach(([key, value]) => {
      if (key === "photo") {
         if (value instanceof File) {
            formDataMember.append(key, value);
         }
      } else if (key === "role") {
         formDataMember.append("role[0]", value);
      } else if (value !== null) {
         formDataMember.append(
            key,
            key === "country" ? updateMemberData.country.name : value
         );
      }
   });

   try {
      const { data } = await axiosInstance.post(
         `/subscriber/members/${updateMemberData.id}`,
         formDataMember,
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
