import { useQuery } from "react-query";
import { getVendorAssets } from "../../api/vendor/getVendorAssets";

export const GET_VENDORS_ASSETS_QUERY_KEY = "subscriber-vendor-assets";

export function useVendorAssets() {
   return useQuery(
      [GET_VENDORS_ASSETS_QUERY_KEY],
      getVendorAssets
   );
}
