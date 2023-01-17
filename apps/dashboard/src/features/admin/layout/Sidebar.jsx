import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useAuth } from "~/features/auth/useAuth";

import { IconFolderCheckFill } from "~/components/icons/IconFolderCheckFill";
import { IconSearchAltFill } from "~/components/icons/IconSearchAltFill";
import { IconBagAltFill } from "~/components/icons/IconBagAltFill";

import { IconBookmark } from "~/components/icons/IconBookmark";
import { productInspectionLinks } from "./AppMenu";
import { SidebarMainMenuCollapsible } from "./SidebarMainMenuCollapsible";

export const facilityManagementLinks = [
    {
        icon: <IconBookmark />,
        label: "Dashboard",
        to: "/admin/facility-management",
    },
];
const freelancerProductLinks = [
    {
        icon: <IconBookmark />,
        label: "Dashboard",
        to: "/admin/freelancer-product",
    },
];

const headerHeight = 72;
const mainMenuPadding = 11;

export function Sidebar(props) {
    const { t } = useTranslation();
    const menu = useRef(null);
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const location = useLocation();
    const pathname = location.pathname?.split("/");


    const activeMenuCategory = pathname[2];
    const activeMainMenu = location.pathname;

    const categoryBgRef = useRef(null);
    const activeCategoryMenuRef = useRef(null);

    const stickRef = useRef(null);
    const activeMainMenuRef = useRef(null);
    const [isHover, setIsHover] = useState(false);

    function handleLogout() {
        logout();
    }

    const menuList = {
        "facility-management": {
            name: "Facility Management",
            icon: <IconFolderCheckFill />,
            links: facilityManagementLinks,
        },
        "product-inspection": {
            name: "Product Inspection",
            icon: <IconSearchAltFill />,
            links: productInspectionLinks,
        },
        "freelancer-product": {
            name: "Freelancer Product",
            icon: <IconBagAltFill />,
            links: freelancerProductLinks,
        },
    };

    return (
        <div
            className="menu-wrapper top-[72px] w-[326px] shadow-none border-right-1"
            onClick={props.onMenuClick}
            style={{ borderColor: "var(--gray-50)" }}
        >
            <div className="layout-menu-container" ref={sidebarRef}>
                <div className="overflow-auto flex h-full">
                    <div className="layout-menu pt-[18px] w-[122px] bg-[#FAFBFF] h-full p-[12px]">
                        <ul role="menu">
                            {Object.entries(menuList).map(([objKey, value]) => {
                                return (
                                    <CategoryMenuItem
                                        activeCategoryMenuRef={activeCategoryMenuRef}
                                        categoryBgRef={categoryBgRef}
                                        key={value.name}
                                        objKey={objKey}
                                        menu={value}
                                        activeMenuCategory={activeMenuCategory}
                                        setMobileMenuActive={props.setMobileMenuActive}
                                    />
                                );
                            })}
                            <li>
                                <div
                                    ref={categoryBgRef}
                                    className="bg-[#F4F6FF] transition-[top] absolute z-1 rounded-[8px]"
                                ></div>
                            </li>
                        </ul>
                    </div>
                    <div className="layout-menu pt-[6px] w-[204px] border-solid border-l border-y-0 border-r-0 border-[#F4F6FF]">
                        <ul role="menu" className="first:mt-[12px] xl:last:mb-[72px]">
                            {menuList[pathname[2]]?.links.map((link, index) => {
                                if (link.isCollapsible) {
                                    return (
                                        <SidebarMainMenuCollapsible
                                            isCollaptibleActive={link.list.map(data =>  data.to).includes(activeMainMenu)}
                                            icon={link.icon}
                                            isHover={isHover}
                                            setIsHover={setIsHover}
                                            stickRef={stickRef}
                                            activeMainMenuRef={activeMainMenuRef}
                                            activeMainMenu={activeMainMenu}
                                            setMobileMenuActive={props.setMobileMenuActive}
                                            name={link.collapsibleName}
                                            list={link.list}
                                            key={index}
                                        />
                                    )
                                }
                                return (
                                    <MainMenuItem
                                        isHover={isHover}
                                        setIsHover={setIsHover}
                                        stickRef={stickRef}
                                        activeMainMenuRef={activeMainMenuRef}
                                        key={link.to}
                                        link={link}
                                        activeMainMenu={activeMainMenu}
                                        setMobileMenuActive={props.setMobileMenuActive}
                                    />
                                );
                            })}
                            <li>
                                <div
                                    ref={stickRef}
                                    className="bg-[#2854F6] invisible h-[24px] w-[3px] absolute z-1 rounded-md"
                                ></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategoryMenuItem(props) {
    const {
        menu,
        activeMenuCategory,
        objKey,
        setMobileMenuActive,
        activeCategoryMenuRef,
        categoryBgRef,
    } = props;

    const isActive = objKey === activeMenuCategory;

    function updateBgStyle({ top, left, width, height }) {
        categoryBgRef.current.style.top = `${top - headerHeight}px`;
        categoryBgRef.current.style.left = `${left}px`;
        categoryBgRef.current.style.width = `${width}px`;
        categoryBgRef.current.style.height = `${height}px`;
    }

    function onMouseOver(event) {
        const size = event.currentTarget.getBoundingClientRect();

        updateBgStyle({
            top: size.top,
            left: size.left,
            width: size.width,
            height: size.height,
        });
    }

    function onMouseLeave() {
        const size = activeCategoryMenuRef.current?.getBoundingClientRect();
        updateBgStyle({ top: size?.top });
    }

    useEffect(() => {
        if (activeCategoryMenuRef.current) {
            const size = activeCategoryMenuRef.current?.getBoundingClientRect();

            updateBgStyle({
                top: size.top,
                left: size.left,
                width: size.width,
                height: size.height,
            });
        }
    }, [isActive]);

    return menu.links.length > 0 ? (
        <li>
            <NavLink
                ref={isActive ? activeCategoryMenuRef : null}
                className={classNames(
                    "flex flex-column relative z-2 items-center justify-center text-center rounded-[6px]",
                    "text-[#7A7A7A] font-medium hover:text-[#2854F6] select-none",
                    { "text-[#2854F6] font-bold bg-[#F4F6FF]": isActive }
                )}
                style={{
                    padding: "11px",
                }}
                to={menu.links[0].to}
                onClick={() => setMobileMenuActive(false)}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            >
                {menu.icon}
                <span className="mt-[12px]">{menu.name}</span>
            </NavLink>
        </li>
    ) : null;
}

function MainMenuItem(props) {
    const {
        link,
        activeMainMenu,
        setMobileMenuActive,
        activeMainMenuRef,
        stickRef,
        isHover,
        setIsHover,
    } = props;
    const currentPath = link.to;
    const isActive = activeMainMenu === currentPath;

    function updateStickStyle({ top }) {
        stickRef.current.style.top = `${top - headerHeight + mainMenuPadding}px`;
    }

    function onMouseOver(event) {
        const size = event.currentTarget.getBoundingClientRect();

        setIsHover(true);
        updateStickStyle({ top: size.top });
        stickRef.current.style.visibility = "visible";
    }

    function onMouseLeave() {
        const size = activeMainMenuRef.current?.getBoundingClientRect();

        setIsHover(false);
        updateStickStyle({ top: size?.top });
        stickRef.current.style.visibility = "hidden";
    }

    useEffect(() => {
        if (activeMainMenuRef.current) {
            const size = activeMainMenuRef.current?.getBoundingClientRect();

            updateStickStyle({ top: size.top });
        }
    }, [isActive]);

    return (
        <li className="relative">
            <div
                className={classNames(
                    "bg-[#2854F6] absolute h-[24px] w-[3px] rounded-md ",
                    [isActive && !isHover ? "opacity-100" : "opacity-0"]
                )}
                style={{ top: mainMenuPadding }}
            ></div>
            <NavLink
                to={link.to}
                ref={isActive ? activeMainMenuRef : null}
                onClick={() => setMobileMenuActive(false)}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                className={classNames("hover:text-[#2854F6]", {
                    "text-[#A7A7A7]": !isActive,
                })}
                style={{
                    padding: 0,
                }}
            >
                <div
                    className={classNames(
                        "text-[12px] font-medium rounded-[8px] mx-[12px]",
                        "mb-[8px] flex items-center w-full relative z-2 py-[14px] px-[12px]",
                        { "bg-[#F4F6FF] text-[#2854F6] font-bold": isActive }
                    )}
                >
                    {link.icon}
                    <span className="ml-[12px] mt-px">{link.label}</span>
                </div>
            </NavLink>
        </li>
    );
}
