import { useQuery } from "react-query";
import { getAssetVendor } from "~/features/dashboard/facilityManagement/api/asset/getAssetVendor";

export const GET_ASSETS_VENDORS_QUERY_KEY = "subscriber-assets-vendors";

export function useAssetsVendors() {
   return useQuery([GET_ASSETS_VENDORS_QUERY_KEY], () => getAssetVendor());
}
