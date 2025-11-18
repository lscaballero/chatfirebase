import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import {
  doc,
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import type { Task } from "@/schemas/task.schema";

export const useTaskActions = () => {
  const { data: user } = useUser();

  if (!user) {
    throw new Error("User not found");
  }
  const db = useFirestore();
  const tasksCollection = collection(db, "tasks");

  const tasksQuery = query(tasksCollection, where("userId", "==", user!.uid));

  const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
    idField: "id",
    suspense: true,
  });

  const createTask = async (data: { title: string; description?: string }) => {
    const newTask: Task = {
      ...data,
      completed: false,
      userId: user!.uid,
    };

    return await addDoc(tasksCollection, newTask);
  };

  const deleteTask = async (taskId: string) => {
    const taskDoc = doc(db, "tasks", taskId);
    return await deleteDoc(taskDoc);
  };

  const toggleTaskCompletation = async (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    const taskDoc = doc(db, "tasks", taskId);

    return await updateDoc(taskDoc, {
      completed: !task?.completed,
    });
  };

  return {
    tasks: tasks as Task[],
    isLoading: status === "loading",

    createTask,
    deleteTask,
    toggleTaskCompletation,
  };
};
