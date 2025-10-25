import Link from "next/link";
import { ArrowRight, CalendarDays, UserPlus, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import {
  dashboardSummaryMetrics,
  monthlyHireTrend,
  weeklyAttendanceTrend,
} from "@/demo-data/dashboard";

const quickActions = [
  {
    title: "Add Employee",
    description: "Onboard a new team member and assign them to a department.",
    href: "/employees/new",
    icon: UserPlus,
  },
  {
    title: "View All Employees",
    description: "Browse employee records, roles, and status updates.",
    href: "/employees",
    icon: Users,
  },
  {
    title: "Approve Leave Requests",
    description: "Review pending leave applications awaiting action.",
    href: "/leaves",
    icon: CalendarDays,
  },
];

export default function DashboardPage() {
  const highestMonthlyHire = Math.max(...monthlyHireTrend.map((point) => point.value));
  const highestAttendance = Math.max(...weeklyAttendanceTrend.map((point) => point.value));

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardSummaryMetrics.map(({ title, value, description, delta, iconBg }) => (
          <Card
            key={title}
            title={title}
            value={value}
            description={description}
            footer={delta}
            className="relative overflow-hidden"
          >
            <span className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
              <span className="h-2 w-2 rounded-full bg-current" />
            </span>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1.2fr]">
        <Card title="Monthly New Hires" description="Hiring trend (last 12 months)">
          <div className="flex h-56 items-end justify-between gap-2 rounded-lg border border-dashed border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            {monthlyHireTrend.map((point) => {
              const heightPercent = Math.round((point.value / highestMonthlyHire) * 100);

              return (
                <div key={point.label} className="flex w-8 flex-col items-center justify-end gap-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{point.value}</span>
                  <div className="flex h-full w-full items-end">
                    <span
                      className="w-full rounded-t-lg bg-linear-to-t from-blue-500/70 to-blue-400"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card title="Attendance Chart" description="Average attendance by week">
          <div className="flex h-56 items-end justify-between gap-3 rounded-lg border border-dashed border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            {weeklyAttendanceTrend.map((point) => {
              const heightPercent = Math.round((point.value / highestAttendance) * 100);

              return (
                <div key={point.label} className="flex w-10 flex-col items-center justify-end gap-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{point.value}%</span>
                  <div className="flex h-full w-full items-end">
                    <span
                      className="w-full rounded-t-lg bg-linear-to-t from-emerald-500/70 to-emerald-400"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    {point.label.replace("Week ", "W")}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {quickActions.map(({ title, description, href, icon: Icon }) => (
          <Card key={title} className="flex h-full flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300">
                <Icon size={18} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
            </div>
            <Link
              href={href}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-300"
            >
              Go to {title}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
}
