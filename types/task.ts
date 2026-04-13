export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type TasksContextType = {
  tasks: Task[];
  pendingTasks: Task[];
  completedTasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTasks: (ids: string[]) => void;
  moveTask: (fromIndex: number, toIndex: number) => void;
  selectedIds: string[];
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
};
