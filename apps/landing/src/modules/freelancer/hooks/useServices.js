import { useQuery } from "react-query"
import { getServices, getServiceByID } from "../api"

const FREELANCER_SERVICES = 'FREELANCER_SERVICES'

export function useServices({ id, config, page, budget, delivery_time } = {}) {
   return useQuery(
      [FREELANCER_SERVICES, id, page, budget, delivery_time],
      () => id ? getServiceByID({ id }) : getServices({ page, budget, delivery_time }),
      config
   )
}