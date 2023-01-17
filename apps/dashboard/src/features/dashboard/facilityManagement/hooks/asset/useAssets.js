import { useQuery } from "react-query";
import { getAsset } from "~/features/dashboard/facilityManagement/api/asset/getAsset";

export const GET_ASSETS_QUERY_KEY = "subscriber-assets";

export function useAssets({ id, page, perPage } = {}) {
   return useQuery(
      [GET_ASSETS_QUERY_KEY, id, page, perPage],
      () => getAsset({ id, page, perPage })
   );
}
