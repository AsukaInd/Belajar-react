import { useQuery } from "react-query";
import { getCountries } from "../api/getCountries";

export const GET_COUNTRIES_QUERY_KEY = "freelancer-countries";

export function useCountries() {
    return useQuery([GET_COUNTRIES_QUERY_KEY], getCountries);
}