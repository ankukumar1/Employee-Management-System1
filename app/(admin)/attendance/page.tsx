"use client";

import { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import { employeesDemoData } from "@/demo-data/employees";

type AttendanceStatus = "Present" | "Absent" | "On Leave" | "Remote";

type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  role: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
  totalHours: string;
};

const STATUS_COLOR: Record<AttendanceStatus, string> = {
  Present: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  Absent: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300",
  "On Leave": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  Remote: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
};

function generateRecentAttendance(): AttendanceRecord[] {
  const WORKING_DAYS = 10;
  const RECENT_DATES: string[] = Array.from({ length: WORKING_DAYS }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return date.toISOString().slice(0, 10);
  });

  const statusCycle: AttendanceStatus[] = ["Present", "Remote", "Present", "Present", "On Leave", "Present", "Present", "Absent"];

  const records: AttendanceRecord[] = [];
  employeesDemoData.forEach((employee, employeeIndex) => {
    RECENT_DATES.forEach((date, dateIndex) => {
      const status = statusCycle[(employeeIndex + dateIndex) % statusCycle.length];

      records.push({
        id: `${employee.id}-${date}`,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        role: employee.role,
        date,
        status,
        checkIn: status === "Absent" || status === "On Leave" ? null : "09:45 AM",
        checkOut: status === "Absent" || status === "On Leave" ? null : "06:30 PM",
        totalHours: status === "Absent" || status === "On Leave" ? "0h" : "8h 45m",
      });
    });
  });

  return records;
}

const columnHeaders = ["Employee", "Department", "Date", "Check-In", "Check-Out", "Total", "Status"];

export default function AttendancePage() {
  const attendanceRecords = useMemo(() => generateRecentAttendance(), []);
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | "">("");

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesEmployee = employeeFilter
      ? record.employeeName.toLowerCase().includes(employeeFilter.toLowerCase()) ||
        record.employeeId.toLowerCase().includes(employeeFilter.toLowerCase())
      : true;

    const matchesDate = dateFilter ? record.date === dateFilter : true;
    const matchesStatus = statusFilter ? record.status === statusFilter : true;

    return matchesEmployee && matchesDate && matchesStatus;
  });

  const presentCount = filteredRecords.filter((record) => record.status === "Present").length;
  const remoteCount = filteredRecords.filter((record) => record.status === "Remote").length;
  const leaveCount = filteredRecords.filter((record) => record.status === "On Leave").length;

  const uniqueDates = Array.from(new Set(attendanceRecords.map((record) => record.date))).sort().reverse();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Attendance Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Monitor daily attendance, track patterns, and filter by employee or date.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Records Shown" description="Based on current filters">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{filteredRecords.length}</p>
        </Card>
        <Card title="Present" description="Including on-site attendees">
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{presentCount}</p>
        </Card>
        <Card title="Remote" description="Working from home">
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{remoteCount}</p>
        </Card>
        <Card title="On Leave" description="Approved leave requests">
          <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{leaveCount}</p>
        </Card>
      </section>

      <section className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:grid-cols-[2fr_1fr_1fr]">
        <Input
          label="Filter by employee"
          placeholder="Search name or ID"
          value={employeeFilter}
          onChange={(event) => setEmployeeFilter(event.target.value)}
        />
        <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-700 dark:text-gray-200">Filter by date</span>
          <select
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="">All dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-700 dark:text-gray-200">Status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as AttendanceStatus | "")}
            className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="">All statuses</option>
            <option value="Present">Present</option>
            <option value="Remote">Remote</option>
            <option value="On Leave">On Leave</option>
            <option value="Absent">Absent</option>
          </select>
        </label>

        <div className="sm:col-span-3 flex justify-end">
          <Button type="button" onClick={() => { setEmployeeFilter(""); setDateFilter(""); setStatusFilter(""); }}>
            Reset Filters
          </Button>
        </div>
      </section>

      <Table headers={columnHeaders}>
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <tr key={record.id} className="text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900/40">
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{record.employeeName}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{record.employeeId}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{record.department}</span>
                <div className="text-[13px] text-gray-600 dark:text-gray-300">{record.role}</div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {new Date(record.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{record.checkIn ?? "—"}</td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{record.checkOut ?? "—"}</td>
              <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{record.totalHours}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLOR[record.status]}`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
              No attendance records match the current filters.
            </td>
          </tr>
        )}
      </Table>
    </section>
  );
}
