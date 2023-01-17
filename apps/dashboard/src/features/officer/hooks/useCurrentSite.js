import { useSiteID } from "./useSiteID";
import { useSites } from "./useSites";

export function useCurrentSite() {
    const { status, data, error } = useSites();
    const { siteID } = useSiteID();
    const currentSite = data && data?.data?.length > 0 ? data.data.find(site => site.id === siteID) : null;

    return {
        currentSite,
        status,
        error
    };
}
