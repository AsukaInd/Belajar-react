import { useSiteID } from "../hooks/useSiteID"
import { HomeSection } from "./HomeSection"
import { VisitorItem } from "../visitor/VisitorItem"

export function HomeVisitorCheckOut() {
    const { siteID } = useSiteID()
    const visitors = [
        {
            id: 1,
            first_name: 'john',
            last_name: 'doe',
            company: 'company a',
            created_at: new Date(),
            destination: 'room 1'
        },
        {
            id: 2,
            first_name: 'jane',
            last_name: 'doe',
            company: 'company b',
            created_at: new Date(),
            destination: 'room 2'
        }
    ]

    return (
        <HomeSection
            listName="Visitor Check Out"
            viewAllLink={`/officer/menu/${siteID}/visitor-out`}
        >
            <div className="flex flex-col gap-[12px]">
                {
                    visitors.map(visitor => (
                        <VisitorItem
                            key={visitor.id}
                            visitorData={visitor}
                            siteID={siteID}
                        />
                    ))
                }
            </div>
        </HomeSection>
    )
}
