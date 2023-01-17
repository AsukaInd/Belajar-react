import { useQuery } from "react-query";
import { getCountries } from "../api/getCountries";

export const GET_GT_COUNTRIES_QUERY_KEY = "subscriber-gt-countries";

export function useCountries() {
   return useQuery(GET_GT_COUNTRIES_QUERY_KEY, getCountries);
}
