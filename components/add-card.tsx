"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Plus } from "lucide-react";
import { useModal } from "@/store/use-modal";

type Props = {
  empty: boolean;
  title: string;
};

export const AddCard = ({ empty, title }: Props) => {
  const { onOpen } = useModal();
  return (
    <Card className="bg-zinc-800 flex flex-col justify-center items-center rounded-3xl min-h-72 ">
      <CardContent
        className="flex flex-col gap-4 items-center justify-center cursor-pointer"
        onClick={() => onOpen()}
      >
        {empty && (
          <div className="text-muted-foreground text-sm">
            {`You do not have any ${
              title === "All" ? "" : title.toLowerCase()
            } tasks.`}
          </div>
        )}
        <div className="flex items-center justify-center gap-2">
          <Plus className="w-8 h-8" />
          <p className="text-lg">Add New Task</p>
        </div>
      </CardContent>
    </Card>
  );
};
