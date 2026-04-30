"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useTaskStore } from "@/store/taskStore";

const TaskContext = createContext<any>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const store = useTaskStore();

  return <TaskContext.Provider value={store}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks deve ser usado dentro de TaskProvider");
  }
  return context;
}
