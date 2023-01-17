import { classNames } from "primereact/utils";
import { AiFillInfoCircle } from "react-icons/ai";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IconBagFill } from "~/components/icons/IconBagFill";
import { IconFolderFileFill } from "~/components/icons/IconFolderFileFill";
import { IconHomeFill } from "~/components/icons/IconHomeFill";
import { IconSearchAltFill } from "~/components/icons/IconSearchAltFill";
import { IconUserCircleFill } from "~/components/icons/IconUserCircleFill";
import { Container, MobileContainer } from "../components/Container";
import { FloatingMenu } from "../components/FloatingMenu";

export function OfficerHomeLayout({ children }) {
    return (
        <Container className="shadow-lg relative h-screen flex flex-col overflow-x-hidden">
            <header
                className="shadow-[0px_4px_12px_rgba(36,35,35,0.05)] bg-white sticky top-0 z-10"
            >
                <MobileContainer className="flex items-center justify-between py-[16px]">
                    <div className="flex items-center gap-[8px]">
                        <img
                            alt=""
                            src="/inspxt-logo.png"
                            className="h-[24px]"
                        />
                        <div className="flex items-center gap-[7.5px] bg-blue-4/10 rounded-full py-[4px] px-[8px]">
                            <p className="text-blue-4 text-[10.5px]">Inspector</p>
                            <AiFillInfoCircle className="text-blue-4" />
                        </div>
                    </div>
                </MobileContainer>
            </header>
            <main className="mt-[16px] mb-[50px]">
                {children || <Outlet />}
            </main>
            <BottomNavigation />
            <FloatingMenu />
        </Container>
    )
}

function BottomNavigation() {
    const navigationData = [
        {
            icon: <IconHomeFill />,
            name: 'Overview',
            to: '/officer'
        },
        {
            icon: <IconSearchAltFill height="24" width="24" />,
            name: 'Inspections',
            to: '/officer/inspection'
        },
        {
            icon: <IconBagFill />,
            name: 'Assets',
            to: '/officer/asset'
        },
        {
            icon: <IconFolderFileFill />,
            name: 'Work Orders',
            to: '/officer/work-order'
        },
        {
            icon: <IconUserCircleFill />,
            name: 'Profile',
            to: '/officer/profile'
        }
    ]

    return (
        <div
            className={classNames(
                "bg-white px-0 grid grid-cols-5 items-center mt-auto shadow-[0px_-4px_8px_rgba(36,35,35,0.05)]",
                "fixed bottom-0 w-[100vw] md:w-[360px] left-1/2 transform -translate-x-[48%]"
            )}
        >
            {
                navigationData.map(nav => {
                    return (
                        <NavigationItem
                            key={nav.name}
                            name={nav.name}
                            icon={nav.icon}
                            to={nav.to}
                        />
                    )
                })
            }
        </div>
    )
}

function NavigationItem({ name, icon, to }) {
    const location = useLocation()
    const isActive = to === location.pathname
    const activeClass = isActive ? 'text-blue-4 font-[700]' : ''

    return (
        <NavLink
            className="text-center flex flex-col self-end items-center py-[10px] gap-[8px] transition-all hover:bg-gray-100"
            to={to}
        >
            <div className={classNames("text-[#a7a7a7]", activeClass)}>
                {icon}
            </div>
            <p className={classNames("text-[10.5px] text-black-1", activeClass)}>
                {name}
            </p>
        </NavLink>
    )
}
