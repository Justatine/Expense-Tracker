import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <Suspense fallback={<Loading/>}>
        <section className="gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto h-full">
          {children}
        </section>
      </Suspense>
    );
  }
  