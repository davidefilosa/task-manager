"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useModal } from "@/store/use-modal";
import { FormTask } from "../task-form";

export const FormModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, onClose } = useModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5"></div>
          <DialogTitle className="text-center font-bold text-xl">
            Create a New Task
          </DialogTitle>
        </DialogHeader>
        <FormTask />
      </DialogContent>
    </Dialog>
  );
};
