import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom"

export function VisitorLogHeader({ setActiveTab, activeTab }) {
   const defaultStyle =
      "font-bold border-solid bg-transparent border-x-0 border-t-0 border-b-[3px] p-3 cursor-pointer";
   const activeStyle = "text-[#005AA6] border-[#005AA6]";
   const deactiveStyle = "border-transparent";
   const navigate = useNavigate()

   function resetLink() {
      navigate('/facility-management/reports/visitor-log/')
   }

   return (
      <>
         <AppTopbar left={<h1 className="top-bar-title">Visitor Log</h1>} />
         <div className="flex items-center w-full justify-center gap-4 bg-[#F9F9F9] p-2">
            <button
               className={classNames(defaultStyle, [activeTab === 0 ? activeStyle : deactiveStyle])}
               onClick={() => {
                  setActiveTab(0)
                  resetLink()
               }}
            >
               Walk-ins Visitor
            </button>
            {/* <button
               className={classNames(defaultStyle, [activeTab === 1 ? activeStyle : deactiveStyle])}
               onClick={() => {
                  setActiveTab(1)
                  resetLink()
               }}
            >
               Pre Registration Visitor
            </button> */}
            <button
               className={classNames(defaultStyle, [activeTab === 2 ? activeStyle : deactiveStyle])}
               onClick={() => {
                  setActiveTab(2)
                  resetLink()
               }}
            >
               Visitor Check-out History
            </button>
         </div>
      </>
   );
}
