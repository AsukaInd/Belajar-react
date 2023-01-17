import { useQuery } from "react-query";
import { getReports } from "../api/getReports";

export const GET_REPORTS_QUERY_KEY = "subscriber-reports";

export function useReports({ name, page, pageSize }) {
   return useQuery(
      [GET_REPORTS_QUERY_KEY, name, page, pageSize],
      () => getReports({ name, page, pageSize }),
   );
}
