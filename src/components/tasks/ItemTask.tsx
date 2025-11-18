import { useTaskActions } from "@/hooks/useTaskAction";
import type { Task } from "@/schemas/task.schema";
import { useTransition } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { start } from "repl";
import { tr } from "zod/v4/locales";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
}

const ItemTask = ({ task }: Props) => {
  const { deleteTask, toggleTaskCompletation } = useTaskActions();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.log("error delerte tasks", error);
        toast.error("Error deleting task");
      }
    });
  };

  const handleUpdate = async () => {
    startTransition(async () => {
      try {
        await toggleTaskCompletation(task.id);
      } catch (error) {
        console.log("error updating tasks", error);
        toast.error("Error updating task");
      }
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-extralight",
            task.completed ? "line-through text-gray-500" : ""
          )}
        ></CardTitle>
        <CardAction className="space-x-2">
          <Button
            variant={"outline"}
            onClick={handleUpdate}
            disabled={isPending}
          >
            update
          </Button>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            delete
          </Button>
        </CardAction>
        {task.description && <CardContent>{task.description}</CardContent>}
      </CardHeader>
    </Card>
  );
};

export default ItemTask;
