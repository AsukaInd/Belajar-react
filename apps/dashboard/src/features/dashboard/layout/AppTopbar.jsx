import { classNames } from "primereact/utils";

export function AppTopbar(props) {
   return (
      <div className={classNames(
         'bg-white mt-3 h-5rem px-5 flex align-items-center justify-content-between',
         props.className
      )}>
         <div>{props.left}</div>
         <div>{props.right}</div>
      </div>
   );
}
