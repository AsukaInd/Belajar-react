import { createContext, useMemo, useState } from "react";

export const SiteIDContext = createContext();

const SITE_ID_KEY = "SITE-ID"

export function SiteIDProvider(props) {
    const [siteID, setSiteID] = useState(window.localStorage.getItem(SITE_ID_KEY))

    function updateSiteID(id) {
        setSiteID(id)
        window.localStorage.setItem(SITE_ID_KEY, id)
    }

    const value = useMemo(
        () => ({
            siteID: parseInt(siteID),
            updateSiteID
        }),
        [siteID]
    );

    return <SiteIDContext.Provider value={value} {...props} />;
}

