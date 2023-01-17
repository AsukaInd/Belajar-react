import { useQuery } from "react-query";
import { getTypes } from "../../api/type/getTypes";

export const GET_TYPES_QUERY_KEY = "subscriber-types";

export function useTypes({ name }) {
   return useQuery(`${GET_TYPES_QUERY_KEY}-${name}`, () => getTypes({ name }));
}
