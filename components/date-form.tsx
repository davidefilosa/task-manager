"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  date: z.date(),
});

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Pencil, Plus } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { createTask } from "@/actions/create-task";
import { useModal } from "@/store/use-modal";
import { useToast } from "@/components/ui/use-toast";
import { editDate, editTask } from "@/actions/edit-tasks";
import { Task } from "@prisma/client";

type Props = {
  initialData: Task;
};

export function DateForm({ initialData }: Props) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: initialData?.date,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await editDate({ id: initialData.id, date: values.date });
      toast({ description: "Date edited", variant: "default" });
    } catch (error) {
      console.log(error);
      toast({ description: "Something went wrong!", variant: "destructive" });
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 p-0"
          size="sm"
          disabled={initialData.isCompleted}
        >
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">
            {initialData.isCompleted
              ? `Completed on: ${initialData.updatedAt.toDateString()}`
              : `Due by: ${initialData.date.toDateString()}`}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date <
                        new Date(
                          new Date().setDate(new Date().getDate() - 1)
                        ) || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-center items-center">
              <Button
                type="submit"
                className="flex items-center gap-x-1 justify-center m-4 w-full"
                disabled={form.formState.isSubmitting}
                size="sm"
              >
                Edit Date
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
