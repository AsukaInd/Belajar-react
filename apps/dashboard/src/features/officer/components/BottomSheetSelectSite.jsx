import React, { useState } from "react";
import { useSiteID } from "../hooks/useSiteID";
import { useSites } from "../hooks/useSites";
import { isInsidePolygon } from "~/utils/isInsidePolygon";
import { useGeolocation } from "../hooks/useGeolocation";
import { ErrorMessage } from "~/components/ErrorMessage";
import { classNames } from "primereact/utils";
import { Container } from "./Container";
import { FaChevronRight } from "react-icons/fa";
import { BottomSheet } from "./BottomSheet";
import { Skeleton } from 'primereact/skeleton';

export function BottomSheetSelectSite({ open, onClose }) {
    const { updateSiteID } = useSiteID();
    const { coords, isLoading, errorMessage } = useGeolocation();
    const { status, data, error } = useSites();
    const [notInside, setNotInside] = useState(false);

    function handleClick(siteData) {
        setNotInside(false);
        if (isInsidePolygon(siteData.geo_data, coords)) {
            updateSiteID(siteData.id);
            close();
        } else {
            setNotInside(true);
        }
    }

    function close() {
        onClose()
        setNotInside(false);
    }

    return (
        <Container>
            <BottomSheet
                open={open}
                onClose={close}
                className="flex flex-col gap-[12px] py-[12px]"
            >
                <h1 className="px-[16px] text-center text-2xl font-semibold">
                    Choose Site
                </h1>
                {isLoading ? null : errorMessage ? (
                    <span>{errorMessage}</span>
                ) : (
                    <div className="flex max-h-[25rem] overflow-y-auto flex-col">
                        {status === 'loading' ? (
                            <SelectSiteLoading />
                        ) : data && data.data.length > 0 ? (
                            data.data.map((site) => {
                                return (
                                    <div
                                        className={classNames(
                                            "hover:bg-gray-100 py-[16px] px-[16px] cursor-pointer",
                                            "flex items-center justify-between"
                                        )}
                                        key={site.id}
                                        onClick={() => handleClick(site)}
                                    >
                                        {site.site_name}
                                        <FaChevronRight />
                                    </div>
                                );
                            })
                        ) : status === "error" ? (
                            <ErrorMessage error={error} />
                        ) : (
                            <span className="text-center">data not found</span>
                        )}
                    </div>
                )}
                {notInside ?
                    <p className="text-red-500 px-[16px] text-center text-[12px]">
                        You do not appear to be close to selected work sites
                    </p>
                    : null}
            </BottomSheet>
        </Container>
    );
}
function SelectSiteLoading() {
    return (
        <div className="px-[16px]">
            <Skeleton height="2.5rem" width="100%" className="mb-2"></Skeleton>
            <Skeleton height="2.5rem" width="100%" className="mb-2"></Skeleton>
            <Skeleton height="2.5rem" width="100%" className="mb-2"></Skeleton>
        </div>
    );
}
