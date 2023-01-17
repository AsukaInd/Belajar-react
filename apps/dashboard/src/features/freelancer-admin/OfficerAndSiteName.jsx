import { ErrorMessage } from "~/components/ErrorMessage";
import { classNames } from "primereact/utils";
import { useProfile } from "../officer/hooks/useProfile";
import { Skeleton } from 'primereact/skeleton';
import { useCurrentSite } from "../officer/hooks/useCurrentSite";

export function OfficerAndSiteName() {
    const { status, data, error } = useProfile();
    const currentSiteQuery = useCurrentSite();

    return (
        <div
            className={classNames(
                "bg-white rounded-[8px] shadow-[0px_4px_16px_rgba(36,35,35,0.05)] mb-[28px]",
                "border border-[#F4F4F4]"
            )}
        >
            {status === 'loading'
                ? <OfficerAndSiteNameLoading />
                : status === 'success'
                    ? (
                        <div className="flex items-center justify-between py-[12px] px-[16px] border-b border-[#F4F4F4]">
                            <p className="font-bold">Officer Name</p>
                            <p className="text-[12px] text-grey-1">
                                {data?.data?.first_name || ''} {data?.data?.last_name || ''}
                            </p>
                        </div>
                    )
                    : <ErrorMessage error={error} />}
            {currentSiteQuery.status === 'loading'
                ? <OfficerAndSiteNameLoading />
                : currentSiteQuery.status === 'success'
                    ? (
                        <div className="flex items-center justify-between py-[12px] px-[16px]">
                            <p className="font-bold">Site Name</p>
                            <p className="text-[12px] text-blue-4">{currentSiteQuery.currentSite.site_name}</p>
                        </div>
                    )
                    : <ErrorMessage className="mb-2" error={currentSiteQuery.error} />}
        </div>
    );
}
function OfficerAndSiteNameLoading() {
    return (
        <div className="py-[12px] px-[16px]">
            <Skeleton height="2rem" width="100%"></Skeleton>
        </div>
    );
}
