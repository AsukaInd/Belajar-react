import { Suspense } from "react";

export function LazyLoad({ children }) {
   return <Suspense fallback={null}>{children}</Suspense>;
}
