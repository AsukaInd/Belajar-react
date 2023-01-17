import { useMutation } from "react-query";
import { createReport } from "../api/createReport";

export function useReport(config) {
   return useMutation(createReport, config);
}
