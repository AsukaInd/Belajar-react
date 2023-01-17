import { useQuery } from "react-query";
import { getTruckIn } from "../api/getTruckIn";

export const GET_TRUCK_IN_QUERY_KEY = "officer-truck-in";

export function useTruckIn(params) {
   return useQuery(GET_TRUCK_IN_QUERY_KEY, () => getTruckIn(params));
}
