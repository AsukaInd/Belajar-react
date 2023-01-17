import { useMutation } from "react-query";
import { subscriberLogin } from "../../api/subscriber/subscriberLogin";

export function useSubscriberLogin(config) {
   return useMutation(subscriberLogin, config);
}
