import { useSiteID } from "../hooks/useSiteID"
import { HomeSection } from "./HomeSection"
import { VehicleItem } from "../truck/VehicleItem"

export function HomeVehicleCheckOut() {
    const { siteID } = useSiteID()
    const vehicles = [
        {
            id: 1,
            first_name: 'john',
            last_name: 'doe',
            company: 'company a',
            created_at: new Date(),
            lp: '#123456'
        },
        {
            id: 2,
            first_name: 'jane',
            last_name: 'doe',
            company: 'company b',
            created_at: new Date(),
            lp: '#123456'
        }
    ]

    return (
        <HomeSection
            listName="Vehicle Check Out"
            viewAllLink={`/officer/menu/${siteID}/vehicle-out`}
        >
            <div className="flex flex-col gap-[12px]">
                {
                    vehicles.map(vehicle => (
                        <VehicleItem
                            key={vehicle.id}
                            vehicleData={vehicle}
                            siteID={siteID}
                        />
                    ))
                }
            </div>
        </HomeSection>
    )
}
