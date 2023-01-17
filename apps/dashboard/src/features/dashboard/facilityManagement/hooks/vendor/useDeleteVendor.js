import { useMutation, useQueryClient } from "react-query";
import { deleteVendor } from "~/features/dashboard/facilityManagement/api/vendor/deleteVendor";
import { GET_VENDORS_QUERY_KEY } from "./useVendors";

export function useDeleteVendor({ onSuccess, id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries([GET_VENDORS_QUERY_KEY]);

      if(onSuccess) {
         onSuccess(data)
      }
   }

   return useMutation(() => deleteVendor(id), {
      onSuccess: handleSuccess,
      ...config,
   });
}
