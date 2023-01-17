import { classNames } from "primereact/utils";
import { IconArrowUp } from "~/components/icons/IconArrowUp";
import { IconArrowDown } from "~/components/icons/IconArrowDown";

export function VisitorStatus({ status }) {
   return (
      <div
         className={classNames(
            "visitor-status",
            status === "in" ? "status-in" : "status-out"
         )}
      >
         {status === "in" ? <IconArrowDown /> : <IconArrowUp />}
         <span>{status}</span>
      </div>
   );
}
