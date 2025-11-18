import { useTaskActions } from "@/hooks/useTaskAction";
import ItemTask from "./ItemTask";

const ListTasks = () => {
  const { tasks } = useTaskActions();
  return (
    <div className="space-y-4 ">
      {tasks.map((task) => (
        <ItemTask key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ListTasks;
