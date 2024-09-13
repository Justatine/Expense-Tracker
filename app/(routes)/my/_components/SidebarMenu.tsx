"use client";

import { Command, CommandGroup, CommandList } from "@/components/ui/command";
import {
  ClipboardList,
  FolderKanban,
  Info,
  LayoutDashboard,
  Mail,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import toast from "react-hot-toast";

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

  const handleAddCategory = async (category:string) => {
    const res = await axios.post('/api/categories', { category });
    res.data.success ? toast.success(res.data.message) : toast.error(res.data.message);
    setExpenseCategories((prevData) => [...prevData, { id: Date.now().toString(),  user_id: Date.now().toString(), category: category, createdAt: new Date() }])  
  }

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const categoryInput = event.target.elements.categoryInput.value.trim();
    if (categoryInput) {
      handleAddCategory(categoryInput);
      event.target.reset(); 
    }
  };

  return (
    <div>
      <Card className="flex p-2 gap-2 my-4">
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Add Category</Label>
            <Input name="categoryInput" id="input" placeholder="Type here..." />
          </div>
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </Card>
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