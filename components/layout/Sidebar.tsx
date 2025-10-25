"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Briefcase,
  CalendarCheck,
  Bell,
  UserCog,
  ClipboardCheck,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Departments", href: "/departments", icon: Briefcase },
  { name: "Attendance", href: "/attendance", icon: CalendarCheck },
  { name: "Leaves", href: "/leaves", icon: ClipboardCheck },
  { name: "Roles", href: "/roles", icon: UserCog },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:block">
      <div className="mb-6 text-xl font-bold text-blue-600">EMS Admin</div>
      <nav className="space-y-2">
        {menuItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={name}
              href={href}
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
    </aside>
  );
}
