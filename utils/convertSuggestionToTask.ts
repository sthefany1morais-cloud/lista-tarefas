import { Suggestion, Task } from "@/types/task";

export function suggestionToTask(suggestion: Suggestion): Task {
  return {
    id: suggestion.id,
    text: suggestion.text,
    completed: false,
    createdAt: suggestion.createdAt,
  };
}
