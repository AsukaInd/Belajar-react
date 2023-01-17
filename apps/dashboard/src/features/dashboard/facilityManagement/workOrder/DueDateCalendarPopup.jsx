import { forwardRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Calendar } from "primereact/calendar";
import { updateLocaleOption } from 'primereact/api';

export const DueDateCalendarPopup = forwardRef(
   ({ className, onChange, value, ...props }, ref) => {

      updateLocaleOption('dayNamesMin', ["S", "M", "T", "W", "T", "F", "S"])

      return (
         <OverlayPanel ref={ref} className="due-date-calendar" {...props}>
            <Calendar inline value={value} onChange={onChange} />
         </OverlayPanel>
      );
   }
);
