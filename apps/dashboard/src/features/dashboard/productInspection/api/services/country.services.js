import { useQuery } from "react-query";
import { getAllCountry } from "../repositories/country.repositories";

export const GET_ALL_COUNTRY_QUERY_KEY = "subscriber-all-country";

export function useAllCountry() {
   return useQuery([GET_ALL_COUNTRY_QUERY_KEY], getAllCountry);
}
