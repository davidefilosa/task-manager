"use client";

import { Task } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { completeTask } from "@/actions/complete-tasks";
import { Pencil, Trash } from "lucide-react";
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

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const { toast } = useToast();
  const { onOpen } = useModal();

  const toggleComplete = async (taskId: string) => {
    try {
      await completeTask(taskId);
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
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {task.title}
          {task.isImportant && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className=" w-8  h-8 border border-zinc-400 rounded-full flex justify-center items-center">
                    !
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Important!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <p className="text-sm text-muted-foreground">
          {task.date.toLocaleDateString()}
        </p>

        <div className="flex items-center justify-between w-full">
          <Button
            variant={task.isCompleted ? "default" : "destructive"}
            onClick={() => toggleComplete(task.id)}
          >
            {task.isCompleted ? "Complete" : "Incomplete"}
          </Button>
          <div className="flex gap-4">
            <Pencil
              className="w-4 h-4 cursor-pointer"
              onClick={() => onOpen(task)}
            />
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
