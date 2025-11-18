import FormTask from "@/components/tasks/FormTask";
import ListTasks from "@/components/tasks/ListTasks";
import { Suspense } from "react";

const TaskPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Tasks</h1>
      <FormTask />
      <Suspense fallback={<div>Loading...</div>}>
        <ListTasks />
      </Suspense>
    </div>
  );
};

export default TaskPage;
