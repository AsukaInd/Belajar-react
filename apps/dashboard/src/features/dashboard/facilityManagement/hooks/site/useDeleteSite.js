import { useMutation, useQueryClient } from "react-query";
import { deleteSite } from "../../api/site/deleteSite";
import { GET_SITES_QUERY_KEY } from "./useSites";

export function useDeleteSite({ onSuccess, id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries(`${GET_SITES_QUERY_KEY}`);

      if(onSuccess) {
         onSuccess(data);
      }
   }

   return useMutation(() => deleteSite({ id }), {
      onSuccess: handleSuccess,
      ...config,
   });
}
