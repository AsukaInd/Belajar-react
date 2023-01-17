import { useContext } from "react";
import { SiteIDContext } from "../components/SiteIDProvider";


export function useSiteID() {
    const context = useContext(SiteIDContext);

    if (!context) {
        throw new Error("SiteContext must be used with SiteProvider!");
    }

    return context;
}
