// import { useMutation, useQueryClient } from "react-query";
import { useQuery } from "react-query";
import { detailGigs } from "../../api/Gigs/detailGigs";
import { GET_GIGS_QUERY_KEY } from "./useGigs";

export function useDetailGigs({ key, id } = {}) {
  return useQuery([GET_GIGS_QUERY_KEY, id], () => detailGigs({ id }));
}