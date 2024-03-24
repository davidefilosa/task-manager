import { getCompletedTasks, getTasks } from "@/actions/get-tasks";
import TaskList from "@/components/task-lists";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

export default async function Home() {
  const tasks = await getCompletedTasks();
  return (
    <div className="flex items-center justify-center min-h-screen p-0 md:p-8">
      <div className="bg-zinc-900 w-full min-h-screen rounded-3xl border border-zinc-700 flex items-center justify-center">
        <div className="flex flex-col gap-y-2 items-center justify-center h-full w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <div className="flex flex-col gap-y-2">
                <h3 className="text-2xl mb-4">Sign-in to see your tasks</h3>
                <SignUpButton mode="modal" afterSignInUrl="/" afterSignUpUrl="">
                  <Button size="lg" variant="secondary" className="w-full">
                    Get Started
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="">
                  <Button size="lg" variant="secondary" className="w-full">
                    I already have an account
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <TaskList title="Completed" tasks={tasks} />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
