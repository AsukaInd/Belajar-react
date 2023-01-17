import { useQuery } from "react-query";
import { getGigs } from "../../api/Gigs/getGigs";

export const GET_GIGS_QUERY_KEY = "freelancer-gigs";

export function useGigs({ page, perPage } = {}) {
   return useQuery([GET_GIGS_QUERY_KEY, page, perPage], () => getGigs({ page, perPage }));
}