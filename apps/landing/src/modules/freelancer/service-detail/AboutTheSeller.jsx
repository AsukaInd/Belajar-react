import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { FaStar } from "react-icons/fa";
import { UserPhoto } from "../service/UserPhoto";

export function AboutTheSeller({ user }) {
   return (
      <div id="About the seller">
         <h1 className="text-[30px] font-bold mb-[34px]">About The Seller</h1>
         <Card className="p-[40px] mb-[40px]">
            <div className="flex items-center justify-center md:justify-start flex-wrap gap-[24px] mb-[10px]">
               <UserPhoto
                  className="w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
                  firstName={user.first_name}
                  src={user.photo}
                  alt={`profile picture of ${user.first_name}`}
               />
               <div>
                  <h2 className="text-center md:text-left text-[24px] capitalize font-semibold">
                     {user.first_name} {user.last_name}
                  </h2>
                  <p className="mb-[12px] text-center md:text-left">{user.title}</p>
                  <div className="flex items-center justify-center md:justify-start gap-[6px]">
                     <div className="flex items-center gap-2 text-[#FF8941]">
                        <FaStar size={16} />
                        <span className="text-xl font-medium">{user.star}</span>
                     </div>
                     <span className="text-xl">({user.review_count} Reviews)</span>
                  </div>
               </div>
            </div>
            <Button className="md:ml-[140px] mx-auto" contained>Contact Me</Button>
         </Card>

         <Card className="p-[40px]">
            <div className="flex items-start justify-between h-[40px] gap-[10px] mb-[40px]">
               <div>
                  <p>From</p>
                  <b>{user.country}</b>
               </div>
               <Separator className="w-[1.2px]" orientation="vertical" />
               <div>
                  <p>Member Since</p>
                  <b>{user.created_at}</b>
               </div>
               <Separator className="w-[1.2px]" orientation="vertical" />
               <div>
                  <p>Avg. Response Time</p>
                  <b>{user.avg_response}</b>
               </div>
            </div>
            <p>{user.description}</p>
         </Card>
      </div>
   )
}