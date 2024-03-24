import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
  currentUser,
} from "@clerk/nextjs";
import { Loader, LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Menu from "./menu";

const Sidebar = async () => {
  const user = await currentUser();
  return (
    <div className="h-full p-0 absolute top-0 left-0 w-full">
      <div className="flex flex-col items-center justify-between bg-zinc-900 h-full w-full border border-zinc-700 md:rounded-3xl">
        <div className="mt-8">
          <ClerkLoaded>
            <SignedOut></SignedOut>
            <SignedIn>
              <div className="flex items-center flex-col gap-4">
                <UserButton />
                <div className="text-lg font-semibold flex gap-1 items-center">
                  <div>{user?.firstName}</div>
                  <div>{user?.lastName}</div>
                </div>
              </div>
            </SignedIn>
          </ClerkLoaded>
        </div>
        <div className="w-full">
          <Menu />
        </div>
        <div>
          <ClerkLoaded>
            <SignedOut></SignedOut>
            <SignedIn>
              <div className="flex items-center gap-2 mb-8 text-muted-foreground">
                <LogOut /> <SignOutButton />
              </div>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
