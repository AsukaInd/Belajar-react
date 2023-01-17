import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, OFFICER_KEY } from "~/utils/tokenStorage";

export async function getTypes({ name, siteId }) {
   try {
      const token = tokenStorage.getTokens();
      const { data } = await axiosInstance.get(
         `/officer/${siteId}/${name}/${reportType(name)}`,
         {
            headers: createHeaders(token[OFFICER_KEY]),
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}

function reportType(name) {
   switch (name) {
      case "daily-activity":
         return "observation-types";
      default:
         return "types";
   }
}
