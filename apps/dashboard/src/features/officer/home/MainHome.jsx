import { classNames } from 'primereact/utils';
import { Skeleton } from 'primereact/skeleton';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { ErrorMessage } from "~/components/ErrorMessage"
import { BottomSheetSelectSite } from '../components/BottomSheetSelectSite';
import { useSiteID } from "../hooks/useSiteID"
import { useCurrentSite } from '../hooks/useCurrentSite';
import { HomeVisitorCheckOut } from './HomeVisitorCheckOut';
import { HomeVehicleCheckOut } from './HomeVehicleCheckOut';

export function MainHome() {
    return (
        <div>
            <SiteData />
            <div className='mt-[16px] mb-[32px] flex flex-col gap-[36px]'>
                <HomeVisitorCheckOut />
                <HomeVehicleCheckOut />
            </div>
        </div>
    )
}

function SiteData() {
    const { siteID, updateSiteID } = useSiteID()
    const [open, setOpen] = useState(false)
    const { currentSite, status, error } = useCurrentSite()

    useEffect(() => {
        if (status === 'success' && !currentSite) {
            updateSiteID(null)
        }
    }, [currentSite])

    return (
        <>
            {
                siteID
                    ? (
                        <div
                            className='bg-blue-4/5 hover:bg-gray-200 cursor-pointer py-[6px] px-[12px] rounded-[6px]'
                            onClick={() => setOpen(true)}
                        >
                            {
                                status === 'loading'
                                    ? (
                                        <SiteDataLoading />
                                    )
                                    : status === 'success' && currentSite
                                        ? (
                                            <div
                                                className={classNames(
                                                    'text-[12px] font-semibold text-blue-4 flex items-center justify-between',
                                                )}
                                            >
                                                {currentSite?.site_name}
                                                <FaChevronDown />
                                            </div>
                                        )
                                        : <ErrorMessage error={error} />
                            }
                        </div>
                    ) : null
            }
            <BottomSheetSelectSite open={open} onClose={() => setOpen(false)} />
        </>
    )
}

function SiteDataLoading() {
    return (
        <Skeleton height="1.5rem" width="100%"></Skeleton>
    )
}
