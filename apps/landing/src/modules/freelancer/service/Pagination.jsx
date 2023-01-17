import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import Link from 'next/link'

export function Pagination({ currentPage, totalPage, services }) {
   function createLink(number) {
      return `/freelancer/page/${number}${window.location.search}`
   }

   if (!currentPage || !totalPage || services.length < 1) {
      return null
   }

   function generatePagination(current, totalPage, pageRangeDisplayed = 7) {
      const pagination = []
      const offset = Math.floor(pageRangeDisplayed / 2)

      if (totalPage < 5) {
         for (let i = 1; i <= totalPage; i++) {
            pagination.push(i)
         }
         return pagination
      }

      if (current <= offset) {
         for (let i = 1; i <= pageRangeDisplayed; i++) {
            pagination.push(i)
         }
      }

      if (current <= totalPage - offset && current > offset) {
         for (let i = current - offset; i <= current + offset; i++) {
            pagination.push(i)
         }
      }

      if (current > totalPage - offset) {
         for (let i = totalPage - (pageRangeDisplayed - 1); i <= totalPage; i++) {
            pagination.push(i)
         }
      }

      if (pagination.length > pageRangeDisplayed) {
         pagination.shift()
      }

      return pagination
   }

   return (
      <div className="flex justify-center">
         <div className="flex flex-wrap items-center gap-[14px]">
            {
               currentPage !== 1
                  ? (
                     <div className="mr-[20px] md:mr-[60px]">
                        <PaginationItem href={createLink(1)} value={<FaChevronLeft />} />
                     </div>
                  )
                  : null
            }
            {
               generatePagination(currentPage, totalPage).map(number => {
                  return (
                     <PaginationItem
                        key={number}
                        isActive={number === currentPage}
                        value={number}
                        href={createLink(number)}
                     />
                  )
               })
            }
            {
               currentPage !== totalPage
                  ? (
                     <div className="ml-[20px] md:ml-[60px]">
                        <PaginationItem href={createLink(totalPage)} value={<FaChevronRight />} />
                     </div>
                  )
                  : null
            }
         </div>
      </div>
   );
}

function PaginationItem({ value, isActive, href }) {

   return (
      <Link
         href={href}
      >
         <a
            className={clsx(
               "flex items-center justify-center rounded-full md:text-[20px] font-semibold",
               "h-[38px] w-[30px] md:h-[68px] md:w-[60px] hover:border-2 hover:border-blue-custom",
               [
                  isActive
                     ? "bg-blue-custom text-white shadow-[0px_20px_30px_rgba(0,90,166,0.2)]"
                     : "border-[2px] hover:text-blue-custom",
               ]
            )}
         >
            {value}
         </a>
      </Link>
   );
}
