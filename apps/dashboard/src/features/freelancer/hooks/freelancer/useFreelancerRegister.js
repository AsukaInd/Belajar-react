import { useMutation } from "react-query";
import { freelancerRegister } from "../../api/freelancer/freelancerRegister";

export function useFreelancerRegister(config) {
   return useMutation(freelancerRegister, config);
}