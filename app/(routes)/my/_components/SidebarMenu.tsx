"use client";

import { Command, CommandGroup, CommandList } from "@/components/ui/command";
import axios from "axios";
import {
  ClipboardList,
  FolderKanban,
  Info,
  LayoutDashboard,
  Mail,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Category {
  id: string;       
  category: string; 
}

export default function SidebarMenu() {
  const [activeLink, setActiveLink] = useState("");
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveLink(currentPath);
    
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        if (response.data.success) {
          // console.log(response.data.categories)
          setExpenseCategories(response.data.categories);
        } else {
          console.error('Failed to fetch categories:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (id:string) => {
    setActiveLink(id);
    window.location.replace(`/my/${id}`);
  };

  return (
    <div>
      <Command className="h-full">
        <CommandList>
          <CommandGroup heading="Expenses">
            {expenseCategories.map((category) => (
              <a
                className={`flex gap-2 cursor-pointer text-[13px] p-2 transition hover:bg-blue-400 hover:text-white rounded-lg ${
                  activeLink === category.category
                    ? "bg-gray-200 dark:bg-[#0d1b44]"
                    : ""
                }`}
                key={category.id}
                // href={`/my/${category.id}`}
                onClick={() => handleClick(category.id)}
              >
                <div className="flex gap-2 items-center">
                  {category.category}
                </div>
              </a>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}