import { useQuery } from "react-query";
import { getTourStop } from "../../api/tourStop/getTourStop";

export const GET_TOUR_STOPS_QUERY_KEY = "subscriber-tour-stop";

export function useTourStops({ id, page, pageSize } = {}) {
   return useQuery(
      [GET_TOUR_STOPS_QUERY_KEY, id, page, pageSize], 
      () => getTourStop({ id, page, pageSize })
   );
}
