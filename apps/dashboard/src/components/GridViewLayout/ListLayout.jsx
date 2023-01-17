export function ListLayout({ isNoData, noDataMessage, title, children }) {
   return (
      <div className="border border-1 border-[#e9e9e9] rounded-md bg-white overflow-auto">
         {
            isNoData
               ? <span className="flex items-center justify-center mt-5">{noDataMessage}</span>
               : (
                  <>
                     <h1
                        className="text-[14px] py-3.5 px-3 mb-0 text-[#7a7a7a] sticky top-0 bg-white"
                     >
                        List of {title}
                     </h1>
                     {children}
                  </>
               )
         }
      </div>
   );
}
