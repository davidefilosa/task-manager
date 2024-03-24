"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Plus } from "lucide-react";
import { useModal } from "@/store/use-modal";

export const AddCard = () => {
  const { onOpen } = useModal();
  return (
    <Card
      className="bg-zinc-800 flex flex-col justify-center items-center rounded-3xl cursor-pointer"
      onClick={() => onOpen()}
    >
      <CardContent className="flex gap-2 items-center justify-center min-h-72">
        <Plus className="w-8 h-8" />
        <p>Add New Task</p>
      </CardContent>
    </Card>
  );
};
