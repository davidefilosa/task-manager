"use client";

import { useModal } from "@/store/use-modal";
import { ClerkLoaded, ClerkLoading, SignedIn } from "@clerk/nextjs";
import { Loader, Plus } from "lucide-react";
import React from "react";

const AddButton = () => {
  const { onOpen } = useModal();
  return (
    <>
      <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <div
            onClick={() => onOpen()}
            className="absolute top-4 md:top-12 right-4 md:right-12 z-10 p-2 cursor-pointer rounded-full hover:opacity-75 transition-all bg-zinc-800 flex items-center justify-center border border-zinc-700"
          >
            <Plus className="w-8 h-8 text-green-500" />
          </div>
        </SignedIn>
      </ClerkLoaded>
    </>
  );
};

export default AddButton;
