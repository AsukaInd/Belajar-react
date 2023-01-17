import { useQuery } from "react-query";
import { getProductSize } from "../repositories/product-size.repositories";

export const GET_PRODUCT_SIZE_QUERY_KEY = "subscriber-product-size";

export function useProductSize() {
   return useQuery([GET_PRODUCT_SIZE_QUERY_KEY], getProductSize);
}
