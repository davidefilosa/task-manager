"use server";

import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const editTask = async (values: {
  id: string;
  title: string;
  description: string;
  date: Date;
  isImportant: boolean;
}) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const { title, description, date, isImportant } = values;
  await prismadb.task.update({
    where: { id: values.id },
    data: { title, description, date, isImportant },
  });
  revalidatePath("/");
  revalidatePath("/important");
  revalidatePath("/completed");
  revalidatePath("/to-do");
};

export const editDate = async (values: { id: string; date: Date }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const { date } = values;
  await prismadb.task.update({
    where: { id: values.id },
    data: { date },
  });
  revalidatePath("/");
  revalidatePath("/important");
  revalidatePath("/completed");
  revalidatePath("/to-do");
};
