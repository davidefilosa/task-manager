"use client";

import React, { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Task } from "@prisma/client";
import { Button } from "./ui/button";
import { ArchiveRestore, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { toggleArchived } from "@/actions/archived-tasks";
import { deleteTask } from "@/actions/delete-task";

type Props = {
  task: Task;
};

const ArchivedCard = ({ task }: Props) => {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  const onToggleArchivied = async (taskId: string) => {
    try {
      setPending(true);
      await toggleArchived(taskId);
      toast({ description: "Task restored", variant: "default" });
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast({ description: "Task deleted", variant: "default" });
    } catch (error) {
      console.log(error);
      toast({ description: "Something went wrong!", variant: "destructive" });
    }
  };

  return (
    <Card className="bg-zinc-800 flex justify-between rounded-md items-center">
      <CardHeader>
        <CardTitle>
          <div className="text-lg">{task.title}</div>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex items-center p-0">
        <Button
          size="icon"
          variant="ghost"
          disabled={pending}
          onClick={() => onToggleArchivied(task.id)}
        >
          <ArchiveRestore className="w-4 h-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button size="icon" variant="ghost" disabled={pending}>
              <Trash className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                task.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(task.id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ArchivedCard;
