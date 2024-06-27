import { Link, useLocation } from "react-router-dom";
import React from "react";
import { sidebarOptions } from "@/data/__sidebar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const Sidebar = () => {
  const { pathname: path } = useLocation();

  return (
    <nav className="flex h-screen p-6 fixed">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl text-primary font-bold mt-2 px-6">
            abc firm
          </h1>
          <ul className="px-2 flex flex-col gap-1">
            {sidebarOptions.map((navItem) => {
              return (
                <Link
                  to={navItem.link}
                  key={navItem.key}
                  className={cn(
                    "px-4 py-3 rounded items-center",
                    path === navItem.link
                      ? "bg-background shadow-sm border border-input"
                      : "hover:bg-background hover:shadow-sm"
                  )}
                >
                  <li className="flex gap-3 justify-start items-center">
                    <navItem.icon className="w-6 h-6" />
                    <p
                      className={cn(
                        "text-sm",
                        path === navItem.link
                          ? "text-gray-900 font-medium"
                          : "text-foreground font-normal "
                      )}
                    >
                      {navItem.title}
                    </p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="p-4 bg-white rounded-md flex flex-col gap-4 items-center justify-center">
          <Rocket />
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-gray-900 font-semibold text-sm">
              Upgrade Account
            </h3>
            <p className="text-gray-600 text-xs font-normal">
              Access to Unlimited Transcription
            </p>
          </div>
          <Button className="w-full">Upgrade</Button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
