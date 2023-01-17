import { useQuery } from "react-query";
import { getOfficers } from "../../api/officer/getOfficer";

export const GET_OFFICERS_QUERY_KEY = "subscriber-officers";

export function useOfficers() {
   return useQuery(GET_OFFICERS_QUERY_KEY, getOfficers);
}
