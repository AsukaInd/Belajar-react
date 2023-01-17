import { useQuery } from "react-query";
import { getGigs } from "../api/getGigs";

export const GET_ADMIN_GIGS_QUERY_KEY = "admin-gigs";

export function useGigs({ id, page, perPage } = {}) {
   return useQuery(
      [GET_ADMIN_GIGS_QUERY_KEY, id, perPage, page],
      () => getGigs({ id, perPage, page })
   );
}
