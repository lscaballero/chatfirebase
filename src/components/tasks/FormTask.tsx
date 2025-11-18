import { taskZodSchema, type taskZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { useTaskActions } from "@/hooks/useTaskAction";

const FormTask = () => {
  const [isPending, startTransition] = useTransition();

  const { createTask } = useTaskActions();
  const form = useForm<taskZodSchemaType>({
    resolver: zodResolver(taskZodSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: taskZodSchemaType) {
    startTransition(async () => {
      try {
        await createTask(values);
      } catch (error) {
        console.log("Error craete task", error);
        toast.error("Error creating task");
      }
    });
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="title" placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="title" placeholder="Task Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating task..." : "Create"}
        </Button>
      </Form>
    </form>
  );
};

export default FormTask;
