import { ButtonLink } from "@/components/ui/Button";

export function DetailHeader() {
   const detailHeaderData = [
      "Overview",
      "Description",
      "About the seller",
      "Compare Packages",
      "Recommendations",
      "Reviews"
   ];

   return (
      <div className="flex overflow-auto items-center gap-7 md:mb-[60px] whitespace-nowrap py-4">
         {detailHeaderData.map(item => <ButtonLink key={item} outlined href={`#${item}`}>{item}</ButtonLink>)}
      </div>
   );
}
