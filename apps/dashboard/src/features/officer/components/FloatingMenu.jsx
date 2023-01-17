import { AnimatePresence, motion } from "framer-motion";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useRef, useState, useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconFolderFileFill } from "~/components/icons/IconFolderFileFill";
import { IconMenu } from "~/components/icons/IconMenu";
import { IconPersonArrowLeft } from "~/components/icons/IconPersonArrowLeft";
import { IconSearchAltFill } from "~/components/icons/IconSearchAltFill";
import { IconVehicleCarProfile } from "~/components/icons/IconVehicleCarProfile";
import { useSiteID } from "../hooks/useSiteID";
import { RoundedIconWithBg } from "./RoundedIconWithBg";

export function FloatingMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Menus open={open} setOpen={setOpen} />
            <div
                className="fixed right-[1rem] md:left-1/2 transform md:translate-x-[80px] bottom-[6rem] z-10"
            >
                <button
                    onClick={() => setOpen(true)}
                    className={classNames(
                        "bg-blue-4 hover:bg-blue-3 px-[12px] py-[10px] font-[700] text-white",
                        "rounded-full text-[12px] flex items-center gap-[8px]"
                    )}
                >
                    <IconMenu />
                    Inspect
                </button>
            </div>
        </>
    );
}

function Menus({ open, setOpen }) {
    const menuRef = useRef()
    const { siteID } = useSiteID()
    const menuData = [
        {
            icon: <IconFolderFileFill className="text-blue-4" />,
            name: 'Work Order',
            to: '/officer/create-work-order',
            iconBgColor: 'bg-blue-4/5'
        },
        {
            icon: <IconSearchAltFill className="text-blue-4" />,
            name: 'Pre-register Visitor Check-in',
            to: '/officer/preregister-check-in',
            iconBgColor: 'bg-blue-4/5',
        },
        {
            icon: <IconPersonArrowLeft className="text-green-1" />,
            name: 'Visitor Check In',
            to: `/officer/menu/${siteID}/visitor-in`,
            iconBgColor: 'bg-green-1/5'
        },
        {
            icon: <IconVehicleCarProfile className="text-green-1" />,
            name: 'Vehicle Check In',
            to: `/officer/menu/${siteID}/vehicle-in`,
            iconBgColor: 'bg-green-1/5'
        }
    ]

    useEffect(() => {
        function clickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    function onClose() {
        setOpen(false)
    }

    return (
        <div className="z-20 fixed left-1/2 bottom-[5.7rem] w-[340px] transform translate-x-[-165px]">
            <AnimatePresence>
                {open ?
                    (
                        <motion.div
                            ref={menuRef}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className={classNames(
                                "bg-white origin-bottom-right rounded-[12px] border border-[#f4f4f4]",
                                'shadow-[4px_0px_16px_rgba(36,35,35,0.05)] overflow-hidden'
                            )}
                        >
                            <div className="flex items-center justify-between gap-[24px] py-[12px] px-[16px]">
                                <h1 className="text-[16px] font-bold">What would you like to inspect?</h1>
                                <Button
                                    onClick={onClose}
                                    icon={<BsXLg className="text-blue-4" />}
                                    className="p-button-rounded p-button-text"
                                    aria-label="Close"
                                />
                            </div>
                            <div>
                                {
                                    menuData.map(menu => {
                                        return (
                                            <MenuItem
                                                key={menu.name}
                                                icon={menu.icon}
                                                name={menu.name}
                                                to={menu.to}
                                                iconBgColor={menu.iconBgColor}
                                                onClose={onClose}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </motion.div>
                    ) : null}
            </AnimatePresence>
        </div>
    )
}

function MenuItem({ icon, name, to, iconBgColor, onClose }) {
    return (
        <Link
            className={classNames(
                "flex items-center justify-between py-[12px] px-[16px] hover:bg-gray-100 transition-all",
                "border-b border-[#f4f4f4] last:border-b-0"
            )}
            to={to}
            onClick={onClose}
        >
            <div className="flex items-center gap-[8px]">
                <RoundedIconWithBg
                    bgColor={iconBgColor}
                    icon={icon}
                />
                <p className="font-bold">{name}</p>
            </div>
            <div className="h-[38.49px] w-[38.49px] flex items-center justify-center">
                <FaChevronRight />
            </div>
        </Link>
    )
}
