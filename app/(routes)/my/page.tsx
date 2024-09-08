import { DataTable } from "./_components/DataTable";
// import { authenticate } from "@/app/middlewares/authenticate";

export default async function page() {
  // await authenticate();

  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto h-full">
      <div className="h-[50vh] w-full">
        <DataTable />
      </div>
    </main>
  );
}