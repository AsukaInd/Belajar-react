import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function addMember({ newMemberData }) {
   const token = tokenStorage.getTokens();

   const formDataMember = new FormData();

   Object.entries(newMemberData).forEach(([key, value]) => {
      if (key === "photo") {
         if (value instanceof File) {
            formDataMember.append(key, value);
         }
      } else if (key === "role") {
         formDataMember.append("role[0]", value);
      } else if (value !== null) {
         formDataMember.append(
            key,
            key === "country" ? newMemberData.country.name : value
         );
      }
   });

   try {
      const { data } = await axiosInstance.post(
         `/subscriber/members`,
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
