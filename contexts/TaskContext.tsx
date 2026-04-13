import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Task } from "../types/task";

interface TaskContextType {
  tasks: Task[];
  pendingTasks: Task[];
  completedTasks: Task[];
  pendingSelectedIds: string[];
  completedSelectedIds: string[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  togglePendingSelection: (id: string) => void;
  toggleCompletedSelection: (id: string) => void;
  clearPendingSelection: () => void;
  clearCompletedSelection: () => void;
  deletePendingTasks: (ids: string[]) => void;
  deleteCompletedTasks: (ids: string[]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pendingSelectedIds, setPendingSelectedIds] = useState<string[]>([]);
  const [completedSelectedIds, setCompletedSelectedIds] = useState<string[]>(
    [],
  );

  const addTask = useCallback((text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    console.log("Add task:", newTask.text);
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    console.log("Toggle task:", id);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  const togglePendingSelection = useCallback((id: string) => {
    setPendingSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  }, []);

  const toggleCompletedSelection = useCallback((id: string) => {
    setCompletedSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  }, []);

  const clearPendingSelection = useCallback(() => {
    setPendingSelectedIds([]);
  }, []);

  const clearCompletedSelection = useCallback(() => {
    setCompletedSelectedIds([]);
  }, []);

  const deletePendingTasks = useCallback(
    (ids: string[]) => {
      setTasks((prev) => prev.filter((task) => !ids.includes(task.id)));
      clearPendingSelection();
    },
    [clearPendingSelection],
  );

  const deleteCompletedTasks = useCallback(
    (ids: string[]) => {
      setTasks((prev) => prev.filter((task) => !ids.includes(task.id)));
      clearCompletedSelection();
    },
    [clearCompletedSelection],
  );

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        pendingTasks,
        completedTasks,
        pendingSelectedIds,
        completedSelectedIds,
        addTask,
        toggleTask,
        togglePendingSelection,
        toggleCompletedSelection,
        clearPendingSelection,
        clearCompletedSelection,
        deletePendingTasks,
        deleteCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTasks deve ser usado dentro de TaskProvider");
  return context;
}
