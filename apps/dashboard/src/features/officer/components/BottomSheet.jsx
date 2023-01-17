import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { classNames } from "primereact/utils";
import { BlockUI } from "primereact/blockui";
import { createPortal } from "react-dom";

export function BottomSheet({ open, children, className, onClose }) {
    return createPortal(
        <>
            <BlockUI
                className="z-[100]"
                autoZIndex={false}
                blocked={open}
                onClick={() => onClose ? onClose() : null}
                fullScreen
            />
            <AnimatePresence initial={false}>
                {open
                    ? (
                        <motion.div
                            initial={{ bottom: -300 }}
                            animate={{ bottom: 0 }}
                            exit={{ bottom: -300 }}
                            className={classNames(
                                "bg-white absolute rounded-t-3xl z-[101] left-0 right-0",
                                "shadow-[0px_-4px_8px_rgba(36,35,35,0.05)]",
                                className
                            )}
                        >
                            {children}
                        </motion.div>
                    )
                    : null}
            </AnimatePresence>
        </>
        ,
        document.querySelector('.mobile-container') || document.body)
}
