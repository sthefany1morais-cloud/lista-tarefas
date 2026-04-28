export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type Suggestion = Task & {
  type: string;
  participants: number;
  price: number;
  accessibility: number;
  key: string;
  link?: string;
  accepted: boolean;
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
