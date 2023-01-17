import { useMutation, useQueryClient } from "react-query";
import { addHost } from "../../api/host/addHost";
import { updateHost } from "../../api/host/updateHost";
import { GET_HOST_QUERY_KEY } from "./useHosts";

export function useHostForm({ config, onSuccess, isUpdate }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries([GET_HOST_QUERY_KEY]);
      if (onSuccess) {
         onSuccess(data);
      }
   }

   if (isUpdate) {
      return useMutation(updateHost, {
         onSuccess: handleSuccess,
         ...config,
      });
   }

   return useMutation(addHost, {
      onSuccess: handleSuccess,
      ...config,
   });
}
