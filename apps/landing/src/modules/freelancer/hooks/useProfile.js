import { useQuery } from "react-query"
import { getProfile } from "../api"

const FREELANCER_PROFILE = 'FREELANCER_PROFILE'

export function useProfile({ username, config }) {
   return useQuery([FREELANCER_PROFILE, username], () => getProfile({ username }), config)
}