import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/queryClient";

import "../styles/globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function MyApp({ Component, pageProps }) {
   return (
      <QueryClientProvider client={queryClient}>
         <Component {...pageProps} />
      </QueryClientProvider>
   );
}

export default MyApp;
