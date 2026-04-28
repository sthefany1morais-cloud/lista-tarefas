import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { getSuggestion } from "@/services/suggestions";
import { useTasks } from "../contexts/TaskContext";
import { Suggestion } from "@/types/task";
import { suggestionToTask } from "@/utils/convertSuggestionToTask";

interface SuggestionContextType {
  suggestions: Suggestion[];
  loading: boolean;
  suggestionSelectedIds: string[];
  getNewSuggestion: () => Promise<void>;
  toggleSuggestionSelection: (id: string) => void;
  clearSuggestionSelection: () => void;
  deleteSuggestions: (ids: string[]) => void;
  acceptSuggestions: (ids: string[]) => void;
}

const SuggestionContext = createContext<SuggestionContextType | undefined>(
  undefined,
);

export function SuggestionProvider({ children }: { children: ReactNode }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestionSelectedIds, setSuggestionSelectedIds] = useState<string[]>(
    [],
  );

  const { addTask } = useTasks();

  const getNewSuggestion = useCallback(async () => {
    console.log("Nova sugestão...");
    setLoading(true);
    try {
      const newSuggestion = await getSuggestion();
      if (newSuggestion) {
        console.log("Sugestão:", newSuggestion.text);
        setSuggestions((prev) => [newSuggestion, ...prev.slice(0, 4)]);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleSuggestionSelection = useCallback((id: string) => {
    setSuggestionSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  }, []);

  const clearSuggestionSelection = useCallback(() => {
    setSuggestionSelectedIds([]);
  }, []);

  const deleteSuggestions = useCallback(
    (ids: string[]) => {
      setSuggestions((prev) => prev.filter((s) => !ids.includes(s.id)));
      clearSuggestionSelection();
    },
    [clearSuggestionSelection],
  );

  const acceptSuggestions = useCallback(
    (ids: string[]) => {
      ids.forEach((id) => {
        const suggestion = suggestions.find((s) => s.id === id);
        if (suggestion) {
          const task = suggestionToTask(suggestion);
          addTask(task.text);
          console.log("Movida para A fazer:", task.text);
        }
      });
      deleteSuggestions(ids);
    },
    [suggestions, addTask, deleteSuggestions],
  );

  return (
    <SuggestionContext.Provider
      value={{
        suggestions,
        loading,
        suggestionSelectedIds,
        getNewSuggestion,
        toggleSuggestionSelection,
        clearSuggestionSelection,
        deleteSuggestions,
        acceptSuggestions,
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
}

export function useSuggestions() {
  const context = useContext(SuggestionContext);
  if (!context)
    throw new Error("useSuggestions deve estar dentro de SuggestionProvider");
  return context;
}
