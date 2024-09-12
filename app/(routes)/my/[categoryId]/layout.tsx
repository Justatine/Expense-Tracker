export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <section className="gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto h-full">
        {children}
      </section>
    );
  }
  