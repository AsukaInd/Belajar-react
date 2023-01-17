import { QueryClientProvider } from "react-query";
import { queryClient } from "~/lib/queryClient";
import { AppRoutes } from "./routes";
import { AuthProvider } from "~/features/auth/AuthProvider";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./App.scss";
import "react-phone-input-2/lib/style.css";
import "./tailwind.css";

import 'react-toastify/dist/ReactToastify.css';
import "./lib/i18n";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { SiteIDProvider } from "./features/officer/components/SiteIDProvider";

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
            <SiteIDProvider>
               <AppRoutes />
            </SiteIDProvider>
         </AuthProvider>
      </QueryClientProvider>
   );
}

export default App;
