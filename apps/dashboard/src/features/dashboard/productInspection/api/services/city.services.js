import { useQuery } from "react-query";
import { getAllCity } from "../repositories/city.repositories";

export const GET_ALL_CITY_QUERY_KEY = "subscriber-all-city";

export function useAllCity() {
   return useQuery([GET_ALL_CITY_QUERY_KEY], getAllCity);
}
