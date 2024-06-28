import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { userLogout } from "@/api/auth";
import { logout } from "@/store/slices/authSlice";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth0();

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await userLogout();
                dispatch(logout());
                // logout({ logoutParams: { returnTo: window.location.origin } });
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
