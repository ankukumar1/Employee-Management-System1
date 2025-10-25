"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function GlobalLoader() {
  const { isLoading } = useAuth();

  return isLoading ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-6 py-4 shadow-lg dark:border-blue-900/40 dark:bg-gray-900">
        <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-blue-500" />
        <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Preparing your workspace...</p>
      </div>
    </div>
  ) : null;
}
