import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { Task } from "@/types/task";

let db: SQLite.SQLiteDatabase | null = null;

interface SQLiteRow {
  id: string;
  text: string;
  completed: number;
  createdAt: number;
}

interface TaskStore {
  tasks: Task[];
  pendingSelectedIds: string[];
  completedSelectedIds: string[];
  isLoading: boolean;
  addTask: (text: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  updateTask: (id: string, newText: string) => Promise<void>;
  deleteTasks: (ids: string[]) => Promise<void>;
  togglePendingSelection: (id: string) => void;
  toggleCompletedSelection: (id: string) => void;
  clearPendingSelection: () => void;
  clearCompletedSelection: () => void;
  loadTasks: () => Promise<void>;
}

const initDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("tasks.db");
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        createdAt INTEGER NOT NULL
      );
    `);
    console.log("SQLite inicializado");
  }
  return db;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      pendingSelectedIds: [],
      completedSelectedIds: [],
      isLoading: false,

      addTask: async (text: string) => {
        try {
          const db_ = await initDB();
          const newTask: Task = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false,
            createdAt: Date.now(),
          };

          await db_.runAsync(
            "INSERT INTO tasks (id, text, completed, createdAt) VALUES (?, ?, ?, ?)",
            [newTask.id, newTask.text, 0, newTask.createdAt],
          );

          set((state) => ({ tasks: [newTask, ...state.tasks] }));
          console.log("Task adicionada:", newTask.text);
        } catch (error) {
          console.error("Erro addTask:", error);
        }
      },

      toggleTask: async (id: string) => {
        try {
          const db_ = await initDB();
          const tasks = get().tasks;
          const task = tasks.find((t) => t.id === id);
          if (!task) return;

          const newCompleted = !task.completed;

          await db_.runAsync("UPDATE tasks SET completed = ? WHERE id = ?", [
            newCompleted ? 1 : 0,
            id,
          ]);

          set({
            tasks: tasks.map((t) =>
              t.id === id ? { ...t, completed: newCompleted } : t,
            ),
          });
          console.log("Task toggle:", id);
        } catch (error) {
          console.error("Erro toggleTask:", error);
        }
      },

      updateTask: async (id: string, newText: string) => {
        if (!newText.trim()) return;

        try {
          const db_ = await initDB();
          await db_.runAsync("UPDATE tasks SET text = ? WHERE id = ?", [
            newText.trim(),
            id,
          ]);

          set((state) => ({
            tasks: state.tasks.map((t) =>
              t.id === id ? { ...t, text: newText.trim() } : t,
            ),
          }));
          console.log("Task atualizada:", id);
        } catch (error) {
          console.error("Erro updateTask:", error);
        }
      },

      deleteTasks: async (ids: string[]) => {
        if (ids.length === 0) return;

        try {
          const db_ = await initDB();
          const placeholders = ids.map(() => "?").join(",");
          await db_.runAsync(
            `DELETE FROM tasks WHERE id IN (${placeholders})`,
            ids,
          );

          set((state) => ({
            tasks: state.tasks.filter((task) => !ids.includes(task.id)),
            pendingSelectedIds: [],
            completedSelectedIds: [],
          }));
          console.log("Tasks deletadas:", ids.length);
        } catch (error) {
          console.error("Erro deleteTasks:", error);
        }
      },

      togglePendingSelection: (id: string) =>
        set((state) => ({
          pendingSelectedIds: state.pendingSelectedIds.includes(id)
            ? state.pendingSelectedIds.filter((sid) => sid !== id)
            : [...state.pendingSelectedIds, id],
        })),

      toggleCompletedSelection: (id: string) =>
        set((state) => ({
          completedSelectedIds: state.completedSelectedIds.includes(id)
            ? state.completedSelectedIds.filter((sid) => sid !== id)
            : [...state.completedSelectedIds, id],
        })),

      clearPendingSelection: () => set({ pendingSelectedIds: [] }),
      clearCompletedSelection: () => set({ completedSelectedIds: [] }),

      loadTasks: async () => {
        try {
          set({ isLoading: true });
          const db_ = await initDB();

          const result: SQLiteRow[] = await db_.getAllAsync(
            "SELECT * FROM tasks ORDER BY createdAt DESC",
          );

          const tasks: Task[] = result.map((row) => ({
            id: row.id,
            text: row.text,
            completed: Boolean(row.completed),
            createdAt: row.createdAt,
          }));

          set({ tasks });
          console.log("Tasks carregadas:", tasks.length);
        } catch (error) {
          console.error("Erro loadTasks:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        pendingSelectedIds: [],
        completedSelectedIds: [],
        isLoading: false,
      }),
    },
  ),
);

export const usePendingTasks = () =>
  useTaskStore((s) => s.tasks.filter((t) => !t.completed));
export const useCompletedTasks = () =>
  useTaskStore((s) => s.tasks.filter((t) => t.completed));
export const useIsTaskLoading = () => useTaskStore((s) => s.isLoading);
export const usePendingSelectedIds = () =>
  useTaskStore((s) => s.pendingSelectedIds);
export const useCompletedSelectedIds = () =>
  useTaskStore((s) => s.completedSelectedIds);

useTaskStore.persist.onFinishHydration(() => {
  useTaskStore.getState().loadTasks().catch(console.error);
});
