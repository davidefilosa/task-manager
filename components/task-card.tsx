"use client";

import { Task } from "@prisma/client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { completeTask } from "@/actions/complete-tasks";
import {
  AlarmClockCheck,
  ArchiveX,
  Check,
  CircleAlert,
  Pencil,
  Trash,
} from "lucide-react";
import { deleteTask } from "@/actions/delete-task";
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
import { useModal } from "@/store/use-modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { setImportant } from "@/actions/set-important";
import { cn } from "@/lib/utils";
import { DateForm } from "./date-form";
import { toggleArchived } from "@/actions/archived-tasks";

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const { toast } = useToast();
  const { onOpen } = useModal();
  const [pending, setPending] = useState(false);

  const toggleComplete = async (taskId: string) => {
    try {
      setPending(true);
      await completeTask(taskId);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleImportant = async (taskId: string) => {
    try {
      setPending(true);
      await setImportant(taskId);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onToggleArchivied = async (taskId: string) => {
    try {
      setPending(true);
      await toggleArchived(taskId);
      toast({ description: "Task archivied", variant: "default" });
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
    <Card className="bg-zinc-800 flex flex-col justify-between rounded-3xl">
      <div>
        <CardHeader>
          <CardTitle className="flex items-start justify-between ">
            <div className="flex flex-col gap-1">
              {task.title}
              <DateForm initialData={task} />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleAlert
                    className={cn(
                      "w-6 h-6",
                      task.isImportant
                        ? "text-yellow-300"
                        : "text-muted-foreground"
                    )}
                    onClick={() => toggleImportant(task.id)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {task.isImportant
                      ? "Set as not important"
                      : "Set as important"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{task.description}</p>
        </CardContent>
      </div>

      <CardFooter className="flex flex-col gap-2 items-start">
        <div className="flex items-center justify-between w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={task.isCompleted ? "default" : "destructive"}
                  onClick={() => toggleComplete(task.id)}
                  disabled={pending}
                >
                  <div className="flex items-center gap-2">
                    {task.isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <AlarmClockCheck className="w-4 h-4" />
                    )}
                    {task.isCompleted ? "Completed" : "Not Completed"}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {task.isCompleted
                    ? "Set as not completed"
                    : "Set as completed"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex gap-0 md:gap-4 items-center">
            <Pencil
              className="w-4 h-4 cursor-pointer"
              onClick={() => onOpen(task)}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onToggleArchivied(task.id)}
              disabled={pending}
            >
              <ArchiveX className="w-4 h-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger>
                <Trash className="w-4 h-4 cursor-pointer" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the task.
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
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
