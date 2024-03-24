import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { Loader, Menu } from "lucide-react";
import { ClerkLoaded, ClerkLoading, SignedIn } from "@clerk/nextjs";

const MobileSidebar = () => {
  return (
    <div className="fixed left-4 top-4 md:top-12 md:left-12 rounded-full flex items-center justify-center p-2 border border-zinc-700 bg-zinc-800">
      <Sheet>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <SheetTrigger>
              <Menu className="w-8 h-8 text-green-500" />
            </SheetTrigger>
          </SignedIn>
        </ClerkLoaded>
        <SheetContent side="left">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
