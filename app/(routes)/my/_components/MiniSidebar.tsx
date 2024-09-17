"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Ellipsis, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export default function MiniSidebar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="dark:bg-[#0e1421]">
            <CalendarDays size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className=" ">
          <SheetHeader>
            <SheetTitle>Date Today</SheetTitle>
            {/* <SheetDescription>
              Make changes to your profile here. Click save when youre done.
            </SheetDescription> */}
          </SheetHeader>
          <div className="py-[10%] h-full  overflow-y-auto hide-scrollbar">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl py-5 border flex justify-center bg-[#ffffff] dark:bg-[#030712] mb-5"
            />

          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}