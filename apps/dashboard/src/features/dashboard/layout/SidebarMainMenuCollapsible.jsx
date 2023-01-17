import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { SidebarMainMenuItem } from "../../../components/SidebarMainMenuItem";

export function SidebarMainMenuCollapsible(props) {
    const [isOpen, setIsOpen] = useState(true);

    function toggle() {
        setIsOpen((prev) => !prev);
    }

    return (
        <div
            className="py-2"
        >
            <li
                onClick={toggle}
                className="px-3 flex align-items-center justify-content-between mb-3"
            >
                <span
                    className="capitalize text-sm font-bold"
                    style={{ color: "var(--accent-text-color)" }}
                >
                    {props.name}
                </span>
                <button className="bg-white border-none p-0">
                    {isOpen ? (
                        <i
                            className="fa-solid fa-chevron-up"
                            style={{ color: "var(--accent-text-color)" }}
                        ></i>
                    ) : (
                        <i
                            className="fa-solid fa-chevron-down"
                            style={{ color: "var(--accent-text-color)" }}
                        ></i>
                    )}
                </button>
            </li>
            <CSSTransition
                classNames="app-menu-transition"
                in={isOpen}
                timeout={1000}
                unmountOnExit
            >
                <CollapsibleMenuList {...props} />
            </CSSTransition>
        </div>
    );
}
function CollapsibleMenuList(props) {
    return (
        <div>
            {props.list.map((link, index) => {
                return (
                    <SidebarMainMenuItem
                        isHover={props.isHover}
                        setIsHover={props.setIsHover}
                        stickRef={props.stickRef}
                        activeMainMenuRef={props.activeMainMenuRef}
                        key={index}
                        link={link}
                        activeMainMenu={props.activeMainMenu}
                        setMobileMenuActive={props.setMobileMenuActive} />
                );
            })}
        </div>
    );
}
