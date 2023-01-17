import { Link } from "react-router-dom";

export function HomeSection({ listName, viewAllLink, children }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-[16px]">
                <h1 className="text-[16px] font-bold">{listName}</h1>
                <Link className="text-[12px] text-blue-4" to={viewAllLink}>View All</Link>
            </div>
            {children}
        </div>
    );
}
