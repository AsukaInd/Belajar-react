import { useQuery } from "react-query";
import { getVendor } from "~/features/dashboard/facilityManagement/api/vendor/getVendor";

export const GET_VENDORS_QUERY_KEY = "subscriber-vendor";

export function useVendors({ id, page, perPage, sort_order, sort_by, filter, filter_by, search, config } = {}) {
   return useQuery(
      [GET_VENDORS_QUERY_KEY, id, perPage, page, sort_order, filter, filter_by, search, sort_by],
      () => getVendor({ id, perPage, page, sort_order, filter, filter_by, search, sort_by }),
      config
   );
}
