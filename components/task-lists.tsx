"use client";

import { Task } from "@prisma/client";
import { TaskCard } from "./task-card";
import { AddCard } from "./add-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  tasks: Task[];
};

const TaskList = ({ title, tasks }: Props) => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col p-8 mt-12 ">
      <div className="text-xl font-semibold  flex items-center  ">
        <span className="border-b-2 border-green-500 mr-2 ">
          <Select onValueChange={(value) => router.push(`${value}`)}>
            <SelectTrigger className="w-fit bg-zinc-900 border-0 text-xl">
              <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="/" className="text-lg p-1">
                All
              </SelectItem>
              <SelectItem value="/important" className="text-lg p-1">
                Important
              </SelectItem>
              <SelectItem value="/completed" className="text-lg p-1">
                Completed
              </SelectItem>
              <SelectItem value="/to-do" className="text-lg p-1">
                To Do
              </SelectItem>
            </SelectContent>
          </Select>
        </span>
        <span>Tasks</span>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  grid-rows-3  gap-8 mt-12">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <AddCard />
      </div>
    </div>
  );
};

export default TaskList;
