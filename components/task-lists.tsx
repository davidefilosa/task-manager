import { Task } from "@prisma/client";
import { TaskCard } from "./task-card";
import { AddCard } from "./add-card";

type Props = {
  title: string;
  tasks: Task[];
};

const TaskList = ({ title, tasks }: Props) => {
  return (
    <div className="min-h-screen w-full flex flex-col p-8 mt-12 ">
      <div className="text-xl font-semibold  w-fit  ">
        <span className="border-b-2 border-green-500 mr-2 pb-1">{title}</span>
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
