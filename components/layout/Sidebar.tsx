"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  Bell,
  UserCog,
  ClipboardCheck,
  Settings,
  X,
  IndianRupee,
} from "lucide-react";
import { useCallback } from "react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Departments", href: "/departments", icon: Briefcase },
  { name: "Attendance", href: "/attendance", icon: CalendarCheck },
  { name: "Events", href: "/events", icon: CalendarDays },
  { name: "Leaves", href: "/leaves", icon: ClipboardCheck },
  { name: "Roles", href: "/roles", icon: UserCog },
  { name: "Payroll", href: "/salary", icon: IndianRupee },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const navContent = (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">EMS Admin</div>
        {onClose ? (
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>
      <nav className="space-y-2">
        {menuItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={name}
              href={href}
              onClick={handleClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-blue-100 dark:hover:bg-gray-700 ${
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:block">
        {navContent}
      </aside>

      <div
        className={`fixed inset-0 z-40 flex md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gray-950/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={handleClose}
          aria-hidden="true"
        />
        <aside
          className={`relative ml-auto flex h-full w-64 flex-col border-l border-gray-200 bg-white p-4 shadow-lg transition-transform dark:border-gray-700 dark:bg-gray-800 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navContent}
        </aside>
      </div>
    </>
  );
}
