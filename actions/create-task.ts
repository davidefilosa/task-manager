"use server";

import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createTask = async (values: {
  title: string;
  description: string;
  date: Date;
  isImportant: boolean;
}) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prismadb.task.create({ data: { userId: userId, ...values } });
  revalidatePath("/");
  revalidatePath("/important");
  revalidatePath("/completed");
  revalidatePath("/to-do");
};
