export function CardBooking({ title, right, children }) {
   return (
      <div className="drop-shadow bg-white p-3 mt-8">
         <div className="flex justify-between">
            <h1 className="font-bold text-xl">{title}</h1>
            {/* <button className="bg-blue-600 border-blue-600 text-white rounded p-2">
               Add New
            </button> */}
         </div>
         <div>{children}</div>
      </div>
   );
}
