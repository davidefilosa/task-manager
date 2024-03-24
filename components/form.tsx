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
  title: z.string().min(2).max(50),
  description: z.string(),
  date: z.date(),
  isImportant: z.boolean(),
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
import { editTask } from "@/actions/edit-tasks";

export function FormTask() {
  const { onClose, initialData } = useModal();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      date: initialData?.date || undefined,
      isImportant: initialData?.isImportant || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      try {
        await editTask({ id: initialData.id, ...values });
        toast({ description: "Task edited", variant: "default" });
        onClose();
        console.log(values);
      } catch (error) {
        console.log(error);
        toast({ description: "Something went wrong!", variant: "destructive" });
      }
    } else {
      try {
        await createTask(values);
        toast({ description: "Task created", variant: "default" });
        onClose();
        console.log(values);
      } catch (error) {
        console.log(error);
        toast({ description: "Something went wrong!", variant: "destructive" });
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Dentist Appointment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Dentist Appointment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isImportant"
          render={({ field }) => (
            <FormItem className="w-full flex justify-between items-center">
              <FormLabel>Important</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end items-end">
          <Button
            type="submit"
            className="flex items-center gap-x-1 justify-center"
            disabled={form.formState.isSubmitting}
          >
            {initialData ? (
              <Pencil className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {initialData ? "Edit Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
