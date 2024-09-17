import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./_components/DataTable";
import { DollarSignIcon } from "lucide-react";
import axios from "axios";

export default async function page() {
  let total = 0;

  try {
    const res = await axios.get('/api/total');
    if (res.data.success) {
      total = res.data.data;
    }
  } catch (error) {
    console.error('Error fetching total:', error);
  }

  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto h-full">
      <div className="h-[50vh] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="w-full lg:w-full">
            <Card className="w-full max-w-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$ {total}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                <div className="mt-4 text-primary">
                  {/* additional content can go here */}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full lg:w-full">
            {/* additional card or content can go here */}
          </div>
        </div>
      </div>
    </main>
  );
}