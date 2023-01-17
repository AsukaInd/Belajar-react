import { useQuery } from "react-query";
import { getSupervisors } from "../../api/officer/getSupervisors";

export const GET_SUPERVISORS_QUERY_KEY = "subscriber-officers-supevisors";

export function useSupervisors() {
   return useQuery(GET_SUPERVISORS_QUERY_KEY, getSupervisors);
}
