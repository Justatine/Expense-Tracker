"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import toast from "react-hot-toast";

const SidebarProfile = () => {

  const handleAddCategory = async (category:any) => {
    const res = await axios.post('/api/categories', { category });
    res.data.success ? toast.success(res.data.message) : toast.error(res.data.message);
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
    <Card className="flex p-2 gap-2 my-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Add Category</Label>
          <Input name="categoryInput" id="input" placeholder="Type here..." />
        </div>
        <Button type="submit" className="w-full">Save</Button>
      </form>
    </Card>
  );
};

export default SidebarProfile;