import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, Mail, Phone } from "lucide-react";
import Card from "@/components/ui/Card";
import { employeeProfiles } from "@/demo-data/employees";

interface EmployeePageProps {
  params: { id: string };
}

export default function EmployeeDetailPage({ params }: EmployeePageProps) {
  const profile = employeeProfiles[params.id];

  if (!profile) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-600">
            <Link href="/employees" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-500">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <span>{profile.id}</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{profile.name}</h1>
          {profile.bio ? <p className="text-sm text-gray-500 dark:text-gray-300">{profile.bio}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" /> {profile.status}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            {profile.role}
          </span>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.75fr_1fr]">
        <Card title="Personal Information">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Email</dt>
              <dd className="mt-1 flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <a href={`mailto:${profile.email}`} className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-300">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Phone</dt>
              <dd className="mt-1 flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{profile.phone}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Date of Birth</dt>
              <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {new Date(profile.dob).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Emergency Contact</dt>
              <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">{profile.emergencyContact}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-700 dark:text-gray-300">{profile.address}</dd>
            </div>
          </dl>
        </Card>

        <Card title="Job Details">
          <dl className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start justify-between">
              <div>
                <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Department</dt>
                <dd className="mt-1 font-medium text-gray-900 dark:text-gray-100">{profile.department}</dd>
              </div>
              <Link
                href={`/employees/${profile.id}/edit`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-300"
              >
                Manage <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Role</dt>
              <dd className="mt-1">{profile.role}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Join Date</dt>
              <dd className="mt-1">{new Date(profile.joinDate).toLocaleDateString()}</dd>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">
              <CalendarDays className="h-4 w-4" />
              <span>Leave balance: 12 days • Last appraisal: June 2025</span>
            </div>
          </dl>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card title="Attendance Summary" description={`Updated ${new Date(profile.attendanceSummary.lastUpdated).toLocaleDateString()}`}>
          <dl className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <dt className="text-xs uppercase tracking-wide">Days Present</dt>
              <dd className="mt-1 text-2xl font-semibold">{profile.attendanceSummary.daysPresent}</dd>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              <dt className="text-xs uppercase tracking-wide">Days Absent</dt>
              <dd className="mt-1 text-2xl font-semibold">{profile.attendanceSummary.daysAbsent}</dd>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
              <dt className="text-xs uppercase tracking-wide">Late Check-ins</dt>
              <dd className="mt-1 text-2xl font-semibold">{profile.attendanceSummary.lateCheckIns}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Recent Attendance</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-5">
              {profile.recentAttendance.map((entry) => (
                <div
                  key={entry.date}
                  className="rounded-lg border border-gray-200 p-3 text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400"
                >
                  <div className="font-semibold text-gray-700 dark:text-gray-200">
                    {new Date(entry.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </div>
                  <div
                    className={`mt-1 inline-flex w-full justify-center rounded-full px-2 py-1 text-[11px] font-semibold ${
                      entry.status === "Active"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : entry.status === "On Leave"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                    }`}
                  >
                    {entry.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Performance" description="Composite score focus areas">
          <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            {profile.performance.map((metric) => (
              <li key={metric.category} className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{metric.category}</span>
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{metric.score}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-full rounded-full ${
                      metric.trend === "up"
                        ? "bg-emerald-500"
                        : metric.trend === "down"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Trend: {metric.trend === "up" ? "Improving" : metric.trend === "down" ? "Needs attention" : "Steady"}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </section>
  );
}
