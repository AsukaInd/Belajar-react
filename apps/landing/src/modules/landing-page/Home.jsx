import { LandingPageLayout } from "@/modules/layout/landing-page-layout/LandingPageLayout";
import { Container } from "@/modules/layout/landing-page-layout/Container";

export function Home() {
   return (
      <LandingPageLayout>
         <Container>
            <h1>home</h1>
         </Container>
      </LandingPageLayout>
   );
}
