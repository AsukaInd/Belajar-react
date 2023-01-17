import { useMutation } from "react-query";
import { userRegister } from "../../api/freelancer/userRegister";

export function useUserRegister(config) {
   return useMutation(userRegister, config);
}