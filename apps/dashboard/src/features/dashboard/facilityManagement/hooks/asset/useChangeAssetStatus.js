import { useMutation, useQueryClient } from "react-query";
import { changeAssetStatus } from "~/features/dashboard/facilityManagement/api/asset/changeAssetStatus";
import { GET_ASSETS_QUERY_KEY } from "./useAssets";

export function useChangeAssetStatus(config) {
   const queryClient = useQueryClient();

   return useMutation(changeAssetStatus, {
      onSuccess(data) {
         queryClient.invalidateQueries([GET_ASSETS_QUERY_KEY]);
      },
      config
   });
}
