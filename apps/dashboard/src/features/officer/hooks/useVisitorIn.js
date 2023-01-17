import { useMutation } from "react-query";
import { visitorIn } from "../api/visitorIn";

export function useVisitorIn(config) {
   return useMutation(visitorIn, config);
}
