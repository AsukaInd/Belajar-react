import { useQuery } from "react-query";
import { getLists } from "../../api/list/getLists";

export const GET_LISTS_QUERY_KEY = "subscriber-lists";

export function useLists({ name }) {
   return useQuery(`${GET_LISTS_QUERY_KEY}-${name}`, () => getLists({ name }));
}
