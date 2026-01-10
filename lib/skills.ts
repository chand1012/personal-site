// Skills Data Structure - Manual only with Tailwind colors
// All colors chosen for readability on both light and dark backgrounds

export type TailwindColor =
  | "sky-500"
  | "neutral-500"
  | "cyan-500"
  | "amber-500"
  | "blue-500"
  | "orange-500"
  | "green-500"
  | "emerald-600"
  | "emerald-500"
  | "teal-500"
  | "red-500"
  | "pink-500"
  | "purple-500"
  | "indigo-500"
  | "yellow-500"
  | "violet-500";

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "devops" | "language";
  color: TailwindColor;
}

// All skills with their Tailwind colors (optimized for dual-theme readability)
export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", color: "sky-500" },
  { name: "React Native", category: "frontend", color: "sky-500" },
  { name: "Next.js", category: "frontend", color: "neutral-500" },
  { name: "Tailwind CSS", category: "frontend", color: "cyan-500" },
  { name: "Shadcn/ui", category: "frontend", color: "neutral-500" },
  { name: "Tauri", category: "frontend", color: "amber-500" },
  { name: "Capacitor", category: "frontend", color: "blue-500" },
  { name: "HTML5", category: "frontend", color: "orange-500" },
  { name: "CSS3", category: "frontend", color: "blue-500" },

  // Backend
  { name: "Node.js", category: "backend", color: "green-500" },
  { name: "Express", category: "backend", color: "neutral-500" },
  { name: "Django", category: "backend", color: "emerald-600" },
  { name: "FastAPI", category: "backend", color: "teal-500" },
  { name: "Redis", category: "backend", color: "red-500" },
  { name: "MongoDB", category: "backend", color: "green-500" },
  { name: "PostgreSQL", category: "backend", color: "blue-500" },
  { name: "MySQL", category: "backend", color: "sky-500" },
  { name: "Supabase", category: "backend", color: "emerald-500" },
  { name: "GraphQL", category: "backend", color: "pink-500" },

  // AI/ML
  { name: "Prompt Engineering", category: "backend", color: "purple-500" },
  { name: "LLMs & RAG", category: "backend", color: "pink-500" },
  { name: "Stable Diffusion", category: "backend", color: "orange-500" },
  { name: "LangChain", category: "backend", color: "emerald-600" },

  // Web3
  { name: "Web3", category: "backend", color: "orange-500" },
  { name: "Ethereum", category: "backend", color: "indigo-500" },
  { name: "Solidity", category: "language", color: "neutral-500" },

  // DevOps
  { name: "Docker", category: "devops", color: "sky-500" },
  { name: "Kubernetes", category: "devops", color: "blue-500" },
  { name: "GitHub Actions", category: "devops", color: "blue-500" },
  { name: "Jenkins", category: "devops", color: "red-500" },
  { name: "AWS", category: "devops", color: "orange-500" },
  { name: "Vercel", category: "devops", color: "neutral-500" },
  { name: "Linux", category: "devops", color: "yellow-500" },
  { name: "Nginx", category: "devops", color: "green-500" },
  { name: "Terraform", category: "devops", color: "violet-500" },

  // Languages
  { name: "TypeScript", category: "language", color: "blue-500" },
  { name: "JavaScript", category: "language", color: "yellow-500" },
  { name: "Python", category: "language", color: "blue-500" },
  { name: "Go", category: "language", color: "cyan-500" },
  { name: "Rust", category: "language", color: "orange-500" },
  { name: "C/C++", category: "language", color: "blue-500" },
  { name: "SQL", category: "language", color: "amber-500" },
  { name: "Bash", category: "language", color: "green-500" },
  { name: "Lua", category: "language", color: "indigo-500" },
];

// Helper function to get skills by category
export function getSkillsByCategory(skillList: Skill[] = skills) {
  const categories: Record<string, Skill[]> = {
    frontend: [],
    backend: [],
    devops: [],
    language: [],
  };

  for (const skill of skillList) {
    categories[skill.category].push(skill);
  }

  return categories;
}

// Map Tailwind color names to text and border classes
// Using explicit class names for Tailwind JIT compilation
export function getColorClasses(color: TailwindColor): {
  text: string;
  border: string;
} {
  const colorMap: Record<TailwindColor, { text: string; border: string }> = {
    "sky-500": { text: "text-sky-500", border: "border-sky-500" },
    "neutral-500": { text: "text-neutral-500", border: "border-neutral-500" },
    "cyan-500": { text: "text-cyan-500", border: "border-cyan-500" },
    "amber-500": { text: "text-amber-500", border: "border-amber-500" },
    "blue-500": { text: "text-blue-500", border: "border-blue-500" },
    "orange-500": { text: "text-orange-500", border: "border-orange-500" },
    "green-500": { text: "text-green-500", border: "border-green-500" },
    "emerald-600": { text: "text-emerald-600", border: "border-emerald-600" },
    "emerald-500": { text: "text-emerald-500", border: "border-emerald-500" },
    "teal-500": { text: "text-teal-500", border: "border-teal-500" },
    "red-500": { text: "text-red-500", border: "border-red-500" },
    "pink-500": { text: "text-pink-500", border: "border-pink-500" },
    "purple-500": { text: "text-purple-500", border: "border-purple-500" },
    "indigo-500": { text: "text-indigo-500", border: "border-indigo-500" },
    "yellow-500": { text: "text-yellow-500", border: "border-yellow-500" },
    "violet-500": { text: "text-violet-500", border: "border-violet-500" },
  };

  return colorMap[color];
}
