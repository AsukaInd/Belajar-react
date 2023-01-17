import { useMutation } from "react-query";
import { subscriberRegister } from "../../api/subscriber/subscriberRegister";

export function useSubscriberRegister(config) {
   return useMutation(subscriberRegister, config);
}
