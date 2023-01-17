import { useQuery } from "react-query";
import { getFreelancers } from "../api/getFreelancers";

export const GET_ADMIN_FREELANCERS_QUERY_KEY = "admin-freelancers";

export function useFreelancers({ id, page, perPage } = {}) {
   return useQuery(
      [GET_ADMIN_FREELANCERS_QUERY_KEY, id, perPage, page],
      () => getFreelancers({ id, perPage, page })
   );
}
