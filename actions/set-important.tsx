"use server";

import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const setImportant = async (taskId: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingTask = await prismadb.task.findFirst({ where: { id: taskId } });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  const isImportant = existingTask.isImportant;

  await prismadb.task.update({
    where: { id: existingTask.id },
    data: { isImportant: !isImportant },
  });
  revalidatePath("/");
  revalidatePath("/important");
  revalidatePath("/completed");
  revalidatePath("/to-do");
};
