import { useMutation } from "react-query";
import { officerLogin } from "../api/officerLogin";

export function useOfficerLogin(config) {
   return useMutation(officerLogin, config);
}
