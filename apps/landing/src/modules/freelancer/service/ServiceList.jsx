import { ServiceItem } from "./ServiceItem";
import { Pagination } from "./Pagination";
import { ServiceFilter } from "./ServiceFilter";
import { useRouter } from 'next/router'
import { FaTimes } from "react-icons/fa";
import clsx from "clsx";

export function ServiceList({ services, total }) {
   const router = useRouter()

   function removeFilter(key) {
      if (!key) return

      const searchParams = new URLSearchParams(window.location.search)

      searchParams.delete(key)

      router.push(`/freelancer/?${searchParams.toString()}`)
   }

   return (
      <div>
         <ServiceFilter />
         <div>
            <div className="md:flex items-center justify-between">
               <h2 className="font-semibold">{total} services avaliable</h2>
               <div className="flex flex-wrap gap-4 items-center my-4 md:my-0">
                  {
                     router.query.budget || router.query.delivery_time
                        ? <p className="font-bold">Filters:</p>
                        : null
                  }
                  {
                     router.query.budget
                        ? (
                           <RemoveFilterButton
                              onClick={() => removeFilter('budget')}
                           >
                              Budget: <span className="font-semibold">${router.query.budget}</span>
                           </RemoveFilterButton>
                        )
                        : null
                  }
                  {
                     router.query.delivery_time ? (
                        <RemoveFilterButton
                           onClick={() => removeFilter('delivery_time')}
                        >
                           Delivery Time: <span className="font-semibold">{router.query.delivery_time} Days</span>
                        </RemoveFilterButton>
                     )
                        : null
                  }
               </div>
            </div>
            <div className="my-[30px] grid md:grid-cols-2 lg:grid-cols-4 gap-10">
               {
                  services.data.data.map(item => <ServiceItem key={item.id} item={item} />)
               }
            </div>
         </div>
         <div className="my-[60px]">
            <Pagination
               services={services.data?.data}
               currentPage={services.data?.current_page}
               totalPage={services.data?.last_page}
            />
         </div>
      </div>
   );
}

function RemoveFilterButton({ children, className, ...props }) {
   return (
      <div className="flex gap-2 border border-[#ddd] rounded-full py-2 px-4 text-sm">
         <p>{children}</p>
         <button className={clsx('hover:text-red-500', className)} {...props}>
            <FaTimes />
         </button>
      </div>
   )
}
