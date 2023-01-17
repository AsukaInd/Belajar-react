import { useMutation, useQueryClient } from "react-query";
import { addSite } from "../../api/site/addSite";
import { updateSite } from "../../api/site/updateSite";
import { GET_SITES_QUERY_KEY } from "./useSites";

export function useSiteForm({ config, handleSuccess, isUpdate }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries(`${GET_SITES_QUERY_KEY}`);
      handleSuccess(data);
   }

   if (isUpdate) {
      return useMutation(updateSite, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addSite, {
      onSuccess,
      ...config,
   });
}
