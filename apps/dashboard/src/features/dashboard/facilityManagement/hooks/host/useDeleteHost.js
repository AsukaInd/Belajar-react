import { useMutation, useQueryClient } from "react-query";
import { deleteHost } from "../../api/host/deleteHost";
import { GET_HOST_QUERY_KEY } from "./useHosts";

export function useDeleteHost({ onSuccess, id, site_id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries([GET_HOST_QUERY_KEY]);

      if (onSuccess) {
         onSuccess(data)
      }
   }

   return useMutation(() => deleteHost({ id, site_id }), {
      onSuccess: handleSuccess,
      ...config,
   });
}
