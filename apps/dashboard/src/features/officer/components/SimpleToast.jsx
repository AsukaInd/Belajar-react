import { AnimatePresence, motion } from "framer-motion";
import { classNames } from "primereact/utils";
import { createPortal } from "react-dom";

export function SimpleToast({ open, children, closeButton, className }) {
    return createPortal(
        <AnimatePresence exitBeforeEnter>
            {open ?
                (
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        exit={{ y: 200 }}
                        className={classNames(
                            "absolute bottom-[0px] left-[24px] right-[24px] bg-red-1 text-white",
                            "shadow-[0px_4px_16px_rgba(36,35,35,0.08)] p-[12px] rounded-[6px] text-[12px]",
                            "flex items-center justify-between",
                            className
                        )}
                    >
                        {children}
                        {closeButton}
                    </motion.div>
                )
                : null}
        </AnimatePresence>
        ,
        document.querySelector('.mobile-container') || document.body)
}