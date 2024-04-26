import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { getArchivedTasks } from "@/actions/get-tasks";
import { Archive } from "lucide-react";
import ArchivedList from "./archived-list";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";

const ArchivedDrawer = async () => {
  const archiviedTasks = await getArchivedTasks();
  return (
    <div className="fixed bottom-4 right-8 md:right-12">
      <Drawer>
        <SignedIn>
          <DrawerTrigger>
            <div className="z-10 p-2 cursor-pointer rounded-full hover:opacity-75 transition-all bg-zinc-800 flex items-center justify-center border border-zinc-700">
              <Archive
                className={cn(
                  "w-8 h-8",
                  archiviedTasks.length === 0
                    ? "text-muted-foreground"
                    : "text-green-500"
                )}
              />
            </div>
          </DrawerTrigger>
        </SignedIn>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Archived Tasks</DrawerTitle>
          </DrawerHeader>
          <ArchivedList archivedTasks={archiviedTasks} />
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ArchivedDrawer;
