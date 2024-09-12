"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, DollarSign, PhilippinePesoIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Expenses { 
  id: number,
  amount: number,
  description:string,
  createdAt:any
}
export default function Category() {
  const params = useParams();
  const categoryId = typeof params?.categoryId === 'string' ? params.categoryId : ''; 
  const [expenses, setexpenses] = useState<Expenses[]>([]);
  const [date, setDate] = useState<Date>()
  
  useEffect(() => {
    const fetchCategory = async (id:string) => {
      try {
        const response = await axios.get(`/api/categories/${id}`);
        if (response.data.success) {
          // console.log(response.data.data);
          setexpenses(response.data.data)
        } else {

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (categoryId) {
      fetchCategory(categoryId);
    }
  }, [categoryId]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    const amount = Number(formData.get('amount'));
    const description = formData.get('description');

    const formValues = Object.fromEntries(formData.entries());
    if (date) { formValues['date'] = format(date, "PPP"); }
    if (categoryId) { formValues['categoryid'] = categoryId }

    const res = await axios.post('/api/expenses', formValues);
    res.data.success ? toast.success(res.data.message) : toast.error(res.data.message);
    setexpenses((prevData) => [...prevData, { id: prevData.length + 1, amount, description: description as string, createdAt: new Date() }]);    
    event.target.reset(); 
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="w-full lg:w-full">
        <div className="p-4 bg-gray-100 rounded-md">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Amount Spent</CardTitle>
                <PhilippinePesoIcon className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="flex text-2xl font-bold"><PhilippinePesoIcon/> 12,345.67</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="mt-1 w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-bold">Submit an Expense</CardTitle>
                <PhilippinePesoIcon className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input 
                      id="amount" 
                      name="amount"
                      placeholder="Enter amount" 
                      type="number" 
                      step="0.01"
                      min={1}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter the expense amount in dollars.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      name="description" 
                      placeholder="Enter expense description"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Provide a brief description of the expense.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-sm text-muted-foreground">
                      Select the date of the expense.
                    </p>
                  </div>

                  <Button type="submit" className="w-full">Submit Expense</Button>
                </form>
              </CardContent>
            </Card>
        </div>
      </div>
      <div className="w-full lg:w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {expenses.map((category, index) => {
            return (
              <div key={index} className="space-y-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{format(category.createdAt, "PPP")}</CardTitle>        
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-muted-foreground">
                      <span className="font-bold">Amount:</span> ₱ {category.amount}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">Reason:</span> {category.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );  
}
