import { Task } from "@prisma/client";
import React from "react";
import ArchivedCard from "./archived-card";

type Props = {
  archivedTasks: Task[];
};

const ArchivedList = ({ archivedTasks }: Props) => {
  if (archivedTasks.length === 0) {
    return (
      <div className="w-full flex items-center justify-center text-muted-foreground my-12">
        You do not have any archived tasks
      </div>
    );
  }
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  grid-rows-3  gap-8 m-8">
      {archivedTasks.map((task) => (
        <ArchivedCard task={task} key={task.id} />
      ))}
    </div>
  );
};

export default ArchivedList;
