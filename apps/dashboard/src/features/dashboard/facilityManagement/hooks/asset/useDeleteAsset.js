import { useMutation, useQueryClient } from "react-query";
import { deleteAsset } from "~/features/dashboard/facilityManagement/api/asset/deleteAsset";
import { GET_ASSETS_QUERY_KEY } from "./useAssets";

export function useDeleteAsset({ onSuccess, id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries([GET_ASSETS_QUERY_KEY]);

      if(onSuccess) {
         onSuccess(data)
      }
   }

   return useMutation(() => deleteAsset(id), {
      onSuccess: handleSuccess,
      ...config,
   });
}
