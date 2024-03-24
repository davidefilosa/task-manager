"use client";

import { cn } from "@/lib/utils";
import { CalendarCheck, Check, Home, ListChecks } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    icon: Home,
    href: "/",
    label: "All Tasks",
  },
  {
    icon: ListChecks,
    href: "/important",
    label: "Important!",
    pro: true,
  },
  {
    icon: Check,
    href: "/completed",
    label: "Completed",
    pro: false,
  },

  {
    icon: CalendarCheck,
    href: "/to-do",
    label: "Do it Now",
    pro: false,
  },
];

import React from "react";

const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4 w-full">
      {routes.map((route) => (
        <Link href={route.href} key={route.label}>
          <div
            className={cn(
              "flex items-center justify-start gap-x-4 w-full bg-zinc-800 hover:opacity-75 hover:border-r-8 border-green-500 p-4 transition-all",
              route.href === pathname && "border-r-8 border-green-500"
            )}
          >
            <route.icon />
            {route.label}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
