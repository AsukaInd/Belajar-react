import { Fragment } from 'react';
import { Progress, ProgressIndicator } from '@/components/ui/Progress';
import { ReviewItem } from '../service-review/ReviewItem';

export function Reviews({ reviews }) {
   return (
      <div id="Reviews">
         <h1 className="text-[30px] font-bold mb-[34px]">
            Reviews <span className="font-normal">({reviews.total} Reviews)</span>
         </h1>
         <div className="grid grid-cols-4 md:grid-cols-7 items-center gap-[23px] mb-[60px]">
            {
               Object.entries(reviews.stars).reverse().map(([key, value]) => (
                  <Fragment key={key}>
                     <Progress className="col-span-3 md:col-span-6" value={value}>
                        <ProgressIndicator value={value} />
                     </Progress>
                     <p className="font-semibold whitespace-nowrap text-blue-custom">
                        {value} ({key} Stars)
                     </p>
                  </Fragment>
               ))
            }
         </div>
         <div className="flex flex-col gap-[34px]">
            {
               reviews.content.map(review => {
                  return <ReviewItem key={review.id} review={review} />
               })
            }
         </div>
      </div>
   )
}