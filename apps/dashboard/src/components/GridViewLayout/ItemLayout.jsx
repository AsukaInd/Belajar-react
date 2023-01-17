import { classNames } from "primereact/utils";
import { useNavigate, useParams } from 'react-router-dom'

export function ItemLayout({ index, children, id, routerState, customLink }) {
   const navigate = useNavigate()
   const params = useParams()

   return (
      <div
         className={classNames(
            "border-solid border-x-0 border-b-0 border-t border-y-[#e9e9e9] mb-3 last:pb-4 last:border-b"
         )}
      >
         <div
            className={classNames(
               "p-3 border-solid border-y-0 border-r-0 border-l-[6px] cursor-pointer",
               "transition duration-75 ease-out hover:ease-in hover:bg-[#f2f7fb]",
               [
                  Number(params?.id) === Number(id)
                     ? "border-l-[#005AA6] bg-[#f2f7fb]"
                     : "border-l-transparent",
               ],
               {
                  "mt-3": index !== 0,
               }
            )}
            onClick={() => {
               navigate(`${customLink || id}`, { state: routerState })
            }}
            tabIndex="0"
         >
            {children}
         </div>
      </div>
   );
}
