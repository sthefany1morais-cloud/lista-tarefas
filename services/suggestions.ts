import { Suggestion } from "@/types/task";

const MOCK_ACTIVITIES = [
  "Beber um café com amigos",
  "Dar uma caminhada no parque",
  "Ler um livro por 30 minutos",
  "Organizar a mesa de trabalho",
  "Fazer 10 minutos de alongamento",
  "Ligar para um amigo",
  "Meditar por 5 minutos",
  "Cozinhar uma receita nova",
  "Assistir um episódio curto de série",
  "Fazer uma lista de gratidão",
];

export async function getRandomActivity(): Promise<any> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch("https://www.boredapi.com/api/activity", {
      signal: controller.signal,
      headers: { "User-Agent": "YourApp/1.0" },
    });

    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return await response.json();
  } catch (error: any) {
    console.warn("API falhou, usando mock:", error.message);
    return {
      activity:
        MOCK_ACTIVITIES[Math.floor(Math.random() * MOCK_ACTIVITIES.length)],
      type: ["recreational", "social", "cooking", "relaxation"][
        Math.floor(Math.random() * 4)
      ],
      participants: Math.floor(Math.random() * 3) + 1,
      price: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : 0,
      accessibility: 0.3 + Math.random() * 0.4,
      key: `mock-${Math.random()}`,
    };
  }
}

export async function translateToPortuguese(text: string): Promise<string> {
  const translations: Record<string, string> = {
    "Drink coffee": "Beber café",
    "Take a walk": "Dar uma caminhada",
    "Read a book": "Ler um livro",
    "Call a friend": "Ligar para um amigo",
  };
  return translations[text as keyof typeof translations] || text;
}

export async function getSuggestion(): Promise<Suggestion | null> {
  try {
    const activity = await getRandomActivity();
    if (!activity?.activity) return null;

    const translatedActivity = await translateToPortuguese(activity.activity);

    return {
      id: Date.now().toString(),
      text: translatedActivity,
      completed: false,
      createdAt: Date.now(),
    } as Suggestion;
  } catch (error) {
    console.error("Erro sugestão:", error);
    return null;
  }
}
