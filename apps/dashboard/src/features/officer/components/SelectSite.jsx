import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { BottomSheetSelectSite } from "./BottomSheetSelectSite";
import { useSiteID } from "../hooks/useSiteID";
import { useSites } from "../hooks/useSites"

export function SelectSite({ children }) {
    const [open, setOpen] = useState(true)
    const { siteID } = useSiteID()
    const { data } = useSites()

    return (
        <>
            {children || <Outlet />}
            <BottomSheetSelectSite
                open={open && !siteID && data?.success}
                onClose={() => {
                    if (siteID) {
                        setOpen(false)
                    }
                }}
            />
        </>
    );
}
