import React from "react";

function ServiceItem({ data }) {
   return (
      <div className="relative border-2 border-gray-100 drop-shadow-md overflow-hidden bg-white rounded-lg my-4 p-2">
         <input
            type="checkbox"
            className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
         />
         <div className="w-full px-2 flex gap-2 items-center">
            <div className="flex text-white rounded-full mr-2">
               <img
                  // src={`https://gt.immershift.com/backend/storage/app/${data.photo}`}
                  src="https://picsum.photos/seed/picsum/50/50"
                  className=" rounded-full bg-green-200"
                  alt="avatar"
               />
            </div>
            <div className="flex flex-col w-full">
               <p className="text-xl font-bold">{data.name}</p>
               <p className="text-gray-500">{data.desc}</p>
               <div className="flex flex-row gap-2">
                  <div className="text-blue-2 border-2 py-1 px-2 rounded-lg border-gray-200 flex gap-2">
                     <img
                        src="/icons/ic_done.svg"
                        alt="icon done"
                        className="h-5 my-auto"
                     />
                     <p className="my-auto">Easy to Use</p>
                  </div>
                  <div className="text-blue-2 border-2 py-1 px-2 rounded-lg border-gray-200 flex gap-2">
                     <img
                        src="/icons/ic_done.svg"
                        alt="icon done"
                        className="h-5 my-auto"
                     />
                     <p className="my-auto">Custom Order</p>
                  </div>
                  <div className="text-blue-2 border-2 py-1 px-2 rounded-lg border-gray-200 flex gap-2">
                     <img
                        src="/icons/ic_done.svg"
                        alt="icon done"
                        className="h-5 my-auto"
                     />
                     <p className="my-auto">All Category</p>
                  </div>
               </div>
            </div>
            <a
               href={`/app/product-inspection/book-now/${data.id}`}
               className="flex gap-1 bg-blue-2 text-white pl-2 py-2 my-auto rounded w-44 "
            >
               <img
                  src="/icons/Book_check_fill.svg"
                  alt="icon done"
                  className="h-5 my-auto"
               />
               <p className="my-auto">Book Service</p>
            </a>
         </div>
      </div>
   );
}

export default ServiceItem;
