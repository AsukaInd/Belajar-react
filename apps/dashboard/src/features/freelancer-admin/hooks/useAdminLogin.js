import { useMutation } from "react-query";
import { adminLogin } from "../api/adminLogin";

export function useAdminLogin(config) {
   return useMutation(adminLogin, config);
}