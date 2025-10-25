import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { Menu } from "lucide-react";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 p-2 text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 md:hidden"
          aria-label="Toggle navigation"
        >
          <Menu size={18} />
        </button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">EMS Admin</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 md:text-xl">Employee Management System</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <div className="hidden text-sm text-gray-500 dark:text-gray-300 sm:block">Welcome back, Admin</div>
      </div>
    </header>
  );
}
