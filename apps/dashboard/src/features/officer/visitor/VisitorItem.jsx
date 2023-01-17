import { classNames } from "primereact/utils";
import { FaChevronRight } from "react-icons/fa";
import { IconDateRangeLight } from "~/components/icons/IconDateRangeLight";
import { IconSubtract } from "~/components/icons/IconSubtract";
import { formatDate } from "~/utils/formatDate";
import { RoundedIconWithBg } from "../components/RoundedIconWithBg";
import { Link } from "react-router-dom";
import { Skeleton } from 'primereact/skeleton';
import { IconPersonArrowLeft } from "~/components/icons/IconPersonArrowLeft";

export function VisitorItem({ visitorData, siteID }) {
    return (
        <Link to={`/officer/menu/${siteID}/visitor-out/${visitorData.id}`}>
            <VisitorItemCard>
                <div>
                    <div className="mb-[12px]">
                        <h2 className="font-bold text-[14px] mb-[6px]">
                            {visitorData.first_name} {visitorData.last_name}
                        </h2>
                        <p className="text-[12px]">{visitorData.company || '-'}</p>
                    </div>
                    <div className="flex items-center gap-[8px]">
                        <div className="flex items-center gap-[6.5px] border-r border-[#F4F4F4] pr-[8px]">
                            <IconDateRangeLight className="mb-[1.4px]" />
                            <p className="text-[10.5px] text-grey-1">{formatDate(visitorData.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-[6.5px]">
                            <IconSubtract />
                            <p className="text-[10.5px] text-blue-4">{visitorData.destination}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[12px]">
                    <RoundedIconWithBg
                        textColor="text-green-1"
                        bgColor="bg-green-1/5"
                        icon={<IconPersonArrowLeft />}
                    />
                    <FaChevronRight className="text-[#a7a7a7]" />
                </div>
            </VisitorItemCard>
        </Link>
    );
}

function VisitorItemCard({ children, noHover }) {
    return (
        <div
            className={classNames(
                "flex items-center justify-between rounded-[8px] shadow-[0px_4px_12px_rgba(36,35,35,0.05)]",
                "bg-white p-[12px] transition-all",
                [noHover ? '' : 'hover:shadow-[0px_10px_22px_rgba(36,35,35,0.15)]'],
            )}
        >
            {children}
        </div>
    )
}

export function VisitorItemLoading() {
    return (
        <VisitorItemCard noHover>
            <div>
                <Skeleton height="1rem" width="200px" className="mb-2"></Skeleton>
                <Skeleton height="1rem" width="100px" className="mb-2"></Skeleton>
                <Skeleton height="1rem" width="100px"></Skeleton>
            </div>
        </VisitorItemCard>
    )
}
