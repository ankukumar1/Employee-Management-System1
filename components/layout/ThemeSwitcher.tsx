"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
      <span>{theme === "light" ? "Light" : "Dark"} mode</span>
    </button>
  );
}
