import clsx from "clsx";
import { Header } from "./Header";
import { MobileHeader } from "./MobileHeader";

export function LandingPageLayout({ children, className }) {
   return (
      <div>
         <Header />
         <MobileHeader />
         <div className={clsx("md:mt-[60px]", className)}>{children}</div>
      </div>
   );
}
