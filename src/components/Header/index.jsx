import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="absolute flex justify-between w-full px-9 py-2 bg-white">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[300px] lg:w-[629px] shadow-sm bg-gray-50"
      />
      <div className="flex gap-3 items-center justify-center">
        <div className="p-2 w-10 h-10 rounded-full bg-gray-100">
          <Bell className="w-6 h-6" />
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
