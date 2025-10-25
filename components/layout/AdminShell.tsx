"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

interface AdminShellProps {
  children: ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((open) => !open);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="flex flex-1 flex-col">
        <Topbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
