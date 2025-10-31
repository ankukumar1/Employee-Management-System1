"use client";

import { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type NotificationCategory = "System" | "HR" | "Attendance" | "Leave" | "Payroll";

type Notification = {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  createdAt: string;
  isRead: boolean;
  actor?: string;
  actionUrl?: string;
};

const categoryAccent: Record<NotificationCategory, string> = {
  System: "bg-blue-500",
  HR: "bg-purple-500",
  Attendance: "bg-amber-500",
  Leave: "bg-emerald-500",
  Payroll: "bg-indigo-500",
};

function generateInitialNotifications(): Notification[] {
  const now = new Date();

  const addDays = (offset: number) => {
    const dt = new Date(now);
    dt.setDate(now.getDate() - offset);
    return dt.toISOString();
  };

  return [
    {
      id: "notif-1",
      title: "New employee added",
      message: "Rahul Sharma has been onboarded to the Engineering department.",
      category: "HR",
      createdAt: addDays(0),
      actor: "Priya Singh",
      isRead: false,
    },
    {
      id: "notif-2",
      title: "Leave request approved",
      message: "Casual leave for Anita Verma from 29 Oct to 31 Oct has been approved.",
      category: "Leave",
      createdAt: addDays(1),
      actor: "Admin",
      isRead: false,
    },
    {
      id: "notif-3",
      title: "Attendance summary generated",
      message: "Weekly check-in summary for Engineering team is ready.",
      category: "Attendance",
      createdAt: addDays(1),
      isRead: true,
      actionUrl: "#attendance-report",
    },
    {
      id: "notif-4",
      title: "System maintenance scheduled",
      message: "Planned downtime on 2 Nov from 1:00 AM to 3:00 AM IST.",
      category: "System",
      createdAt: addDays(3),
      isRead: true,
    },
    {
      id: "notif-5",
      title: "Payroll processed",
      message: "October payroll has been processed. Payslips are available for employees.",
      category: "Payroll",
      createdAt: addDays(4),
      isRead: false,
    },
    {
      id: "notif-6",
      title: "Leave request pending",
      message: "Vikram Patel requested sick leave (1 Nov). Requires approval.",
      category: "Leave",
      createdAt: addDays(2),
      isRead: false,
    },
    {
      id: "notif-7",
      title: "Attendance anomaly detected",
      message: "Multiple late check-ins recorded for Operations team this week.",
      category: "Attendance",
      createdAt: addDays(5),
      isRead: true,
    },
  ];
}

const categories: (NotificationCategory | "All")[] = ["All", "System", "HR", "Attendance", "Leave", "Payroll"];

function groupByDate(notifications: Notification[]) {
  return notifications.reduce<Record<string, Notification[]>>((accumulator, notification) => {
    const key = new Date(notification.createdAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (!accumulator[key]) accumulator[key] = [];
    accumulator[key].push(notification);
    return accumulator;
  }, {});
}

export default function NotificationsPage() {
  const initialNotifications = useMemo(() => generateInitialNotifications(), []);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const filteredNotifications = notifications.filter((notification) => {
    const matchesCategory = activeCategory === "All" ? true : notification.category === activeCategory;
    const matchesSearch = searchTerm
      ? notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const groupedNotifications = useMemo(() => {
    const grouped = groupByDate(filteredNotifications);
    const sortedKeys = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    return sortedKeys.map((dateKey) => ({ key: dateKey, items: grouped[dateKey] }));
  }, [filteredNotifications]);

  const markAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })));
  };

  const toggleRead = (id: string, nextState: boolean) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, isRead: nextState } : notification,
      ),
    );
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Notifications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track key events across the organization, including employee updates, leave workflows, and system alerts.
          </p>
        </div>
        <Button type="button" onClick={markAllRead} disabled={unreadCount === 0}>
          Mark all as read ({unreadCount} unread)
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Notifications" description="Loaded items">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{notifications.length}</p>
        </Card>
        <Card title="Unread" description="Pending review">
          <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{unreadCount}</p>
        </Card>
        <Card title="Today" description="Arrived in last 24h">
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            {
              notifications.filter(
                (notification) =>
                  new Date().getTime() - new Date(notification.createdAt).getTime() < 24 * 60 * 60 * 1000,
              ).length
            }
          </p>
        </Card>
        <Card title="Leave Updates" description="Approvals & requests">
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
            {notifications.filter((notification) => notification.category === "Leave").length}
          </p>
        </Card>
      </section>

      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex w-full gap-3 sm:w-auto">
            <Input
              placeholder="Search notifications"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <Button type="button" onClick={() => setSearchTerm("")}>Clear</Button>
          </div>
        </div>

        <div className="space-y-6">
          {groupedNotifications.length > 0 ? (
            groupedNotifications.map(({ key, items }) => (
              <div key={key} className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {key}
                </div>
                <ul className="space-y-3">
                  {items
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((notification) => (
                      <li
                        key={notification.id}
                        className={`rounded-xl border px-4 py-3 transition hover:border-blue-400 dark:border-gray-800 dark:hover:border-blue-500 ${
                          notification.isRead ? "bg-white dark:bg-gray-950" : "bg-blue-50/80 dark:bg-blue-500/10"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className={`mt-1 h-2 w-2 rounded-full ${categoryAccent[notification.category]}`} />
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  {notification.title}
                                </h3>
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                  {notification.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <span>
                                  {new Date(notification.createdAt).toLocaleTimeString(undefined, {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                {notification.actor ? <span>by {notification.actor}</span> : null}
                                {notification.actionUrl ? (
                                  <a
                                    href={notification.actionUrl}
                                    className="font-semibold text-blue-600 hover:underline dark:text-blue-300"
                                  >
                                    View details
                                  </a>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-2 text-xs">
                            <Button
                              type="button"
                              className="px-2 py-1 text-xs"
                              onClick={() => toggleRead(notification.id, !notification.isRead)}
                            >
                              {notification.isRead ? "Mark unread" : "Mark read"}
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
              No notifications found for the selected filters.
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
