"use server";

import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const getTasks = async () => {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  const tasks = await prismadb.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  revalidatePath("/");
  revalidatePath("/important");
  revalidatePath("/completed");
  revalidatePath("/to-do");
  return tasks;
};

export const getCompletedTasks = async () => {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  const tasks = await prismadb.task.findMany({
    where: { userId, isCompleted: true },
    orderBy: { createdAt: "desc" },
  });
  revalidatePath("/");
  revalidatePath("/important");
  revalidatePath("/completed");
  revalidatePath("/to-do");
  return tasks;
};

export const getImportantTasks = async () => {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  const tasks = await prismadb.task.findMany({
    where: { userId, isImportant: true },
    orderBy: { createdAt: "desc" },
  });
  revalidatePath("/");
  revalidatePath("/important");
  revalidatePath("/completed");
  revalidatePath("/to-do");
  return tasks;
};

export const getToDos = async () => {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  const tasks = await prismadb.task.findMany({
    where: { userId, isCompleted: false },
    orderBy: { createdAt: "desc" },
  });
  revalidatePath("/");
  revalidatePath("/important");
  revalidatePath("/completed");
  revalidatePath("/to-do");
  return tasks;
};
