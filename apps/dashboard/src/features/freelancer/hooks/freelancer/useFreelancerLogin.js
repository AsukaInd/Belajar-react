import { useMutation } from "react-query";
import { freelancerLogin } from "../../api/freelancer/freelancerLogin";

export function useFreelancerLogin(config) {
   return useMutation(freelancerLogin, config);
}