import { useTaskStore } from "@/store/taskStore";

export function useTaskData() {
  const tasks = useTaskStore((state) => state.tasks);
  const pendingSelectedIds = useTaskStore((state) => state.pendingSelectedIds);
  const completedSelectedIds = useTaskStore(
    (state) => state.completedSelectedIds,
  );
  const isLoading = useTaskStore((state) => state.isLoading);

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return {
    tasks,
    pendingTasks,
    completedTasks,
    pendingSelectedIds,
    completedSelectedIds,
    isLoading,
  };
}
