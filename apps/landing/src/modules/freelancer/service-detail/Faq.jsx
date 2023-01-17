import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';

export function Faq({ faqData }) {
   return (
      <div>
         {
            faqData?.length > 0
               ? (
                  <>
                     <h1 className="text-[30px] font-bold mb-[34px]">FAQ</h1>
                     <Accordion type="multiple">
                        {
                           faqData.map(faqItem => {
                              return (
                                 <AccordionItem key={faqItem.id} value={faqItem.id}>
                                    <AccordionTrigger>{faqItem.project_detail_name}</AccordionTrigger>
                                    <AccordionContent>
                                       {faqItem.description_faq}
                                    </AccordionContent>
                                 </AccordionItem>
                              )
                           })
                        }
                     </Accordion>
                  </>
               )
               : null
         }
      </div>
   )
}