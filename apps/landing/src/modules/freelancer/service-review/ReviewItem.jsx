import { Card } from "@/components/ui/Card";
import { FaStar } from "react-icons/fa";

export function ReviewItem({ review }) {
   return (
      <Card className="p-[40px]">
         <div className="flex gap-[14px] items-center mb-[12px]">
            <img src={review.user_picture} className="rounded-full h-[60px] w-[60px]" />
            <div>
               <p className="font-semibold">{review.full_name}</p>
               <p className="text-[12px]">{review.country}</p>
            </div>
         </div>
         <div className="flex gap-[6px] mb-[24px]">
            <FaStar className="text-[#FF8941]" size="1rem" />
            <FaStar className="text-[#FF8941]" size="1rem" />
            <FaStar className="text-[#FF8941]" size="1rem" />
            <FaStar className="text-[#FF8941]" size="1rem" />
            <FaStar className="text-[#FF8941]" size="1rem" />
         </div>
         <div className="mb-[10px] text-[12px] md:text-[1rem]">
            <p>{review.content}</p>
         </div>
         <div>
            <p className="text-[12px] text-[rgba(51,51,51,0.5)]">{review.created_at}</p>
         </div>
      </Card>
   );
}
