"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readStored(): Theme | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "light" || v === "dark") return v;
  return null;
}

function resolveTheme(): Theme {
  const stored = readStored();
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const t = resolveTheme();
    applyTheme(t);
    setTheme(t);
  }, []);

  if (theme === null) {
    return (
      <div
        className="h-8 w-[7.25rem] shrink-0 rounded-full bg-foreground/10"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="flex shrink-0 rounded-full border border-foreground/15 bg-background/50 p-0.5"
      role="group"
      aria-label="Tema de la web"
    >
      <button
        type="button"
        onClick={() => {
          applyTheme("light");
          setTheme("light");
        }}
        aria-pressed={theme === "light"}
        className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:px-3 ${
          theme === "light"
            ? "bg-surface text-foreground shadow-sm"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        Claro
      </button>
      <button
        type="button"
        onClick={() => {
          applyTheme("dark");
          setTheme("dark");
        }}
        aria-pressed={theme === "dark"}
        className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:px-3 ${
          theme === "dark"
            ? "bg-surface text-foreground shadow-sm"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        Oscuro
      </button>
    </div>
  );
}
