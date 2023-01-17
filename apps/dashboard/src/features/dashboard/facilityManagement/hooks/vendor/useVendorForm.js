import { useMutation, useQueryClient } from "react-query";
import { addVendor } from "~/features/dashboard/facilityManagement/api/vendor/addVendor";
import { editVendor } from "~/features/dashboard/facilityManagement/api/vendor/editVendor";
import { GET_VENDORS_QUERY_KEY } from "./useVendors";

export function useVendorForm({ config, handleSuccess, isEdit }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_VENDORS_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   if (isEdit) {
      return useMutation(editVendor, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addVendor, {
      onSuccess,
      ...config,
   });
}
