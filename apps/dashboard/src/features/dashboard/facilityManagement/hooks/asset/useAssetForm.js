import { useMutation, useQueryClient } from "react-query";
import { addAsset } from "~/features/dashboard/facilityManagement/api/asset/addAsset";
import { editAsset } from "~/features/dashboard/facilityManagement/api/asset/editAsset";
import { GET_ASSETS_QUERY_KEY } from "./useAssets";

export function useAssetForm({ config, handleSuccess, isEdit }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_ASSETS_QUERY_KEY]);
      if (handleSuccess) {
         handleSuccess(data);
      }
   }

   if (isEdit) {
      return useMutation(editAsset, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addAsset, {
      onSuccess,
      ...config,
   });
}
