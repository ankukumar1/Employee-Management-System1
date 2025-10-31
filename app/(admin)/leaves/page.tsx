"use client";

import { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { employeesDemoData } from "@/demo-data/employees";

type LeaveType = "Casual" | "Medical" | "Vacation" | "Unpaid";
type LeaveStatus = "Pending" | "Approved" | "Rejected";

type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
};

type LeaveFormState = {
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
};

const LEAVE_TYPES: LeaveType[] = ["Casual", "Medical", "Vacation", "Unpaid"];

function generateInitialRequests(): LeaveRequest[] {
  const today = new Date();

  return employeesDemoData.flatMap((employee, index) => {
    const baseDate = new Date(today);
    baseDate.setDate(today.getDate() - index * 3);
    const startDate = baseDate.toISOString().slice(0, 10);
    const endDateDate = new Date(baseDate);
    endDateDate.setDate(baseDate.getDate() + (index % 3) + 1);
    const endDate = endDateDate.toISOString().slice(0, 10);

    const types: LeaveType[] = ["Casual", "Medical", "Vacation", "Unpaid"];
    const statuses: LeaveStatus[] = ["Pending", "Approved", "Pending", "Rejected"];

    return [
      {
        id: `${employee.id}-lv-${index + 1}`,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        type: types[index % types.length],
        startDate,
        endDate,
        days: (index % 3) + 2,
        reason: "Personal commitments and rest.",
        status: statuses[index % statuses.length],
        appliedOn: baseDate.toISOString().slice(0, 10),
      } satisfies LeaveRequest,
    ];
  });
}

function calculateDays(startDate: string, endDate: string) {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
}

const statusBadgeClasses: Record<LeaveStatus, string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300",
};

export default function LeavesPage() {
  const initialRequests = useMemo(() => generateInitialRequests(), []);
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeaveStatus | "">("");
  const [formState, setFormState] = useState<LeaveFormState>({
    employeeId: employeesDemoData[0]?.id ?? "",
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const pendingCount = requests.filter((leave) => leave.status === "Pending").length;
  const approvedCount = requests.filter((leave) => leave.status === "Approved").length;
  const rejectedCount = requests.filter((leave) => leave.status === "Rejected").length;

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = searchTerm
      ? request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? request.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, nextStatus: LeaveStatus) => {
    setRequests((current) =>
      current.map((request) => (request.id === id ? { ...request, status: nextStatus } : request)),
    );
  };

  const resetForm = () => {
    setFormState({
      employeeId: employeesDemoData[0]?.id ?? "",
      leaveType: "Casual",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.employeeId) {
      alert("Select an employee to apply for leave.");
      return;
    }

    if (!formState.startDate || !formState.endDate) {
      alert("Provide both start and end dates for the leave.");
      return;
    }

    const dayCount = calculateDays(formState.startDate, formState.endDate);
    if (dayCount <= 0) {
      alert("End date must be after the start date.");
      return;
    }

    const employee = employeesDemoData.find((item) => item.id === formState.employeeId);
    if (!employee) {
      alert("Employee not found in records.");
      return;
    }

    const newRequest: LeaveRequest = {
      id: crypto.randomUUID(),
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      type: formState.leaveType,
      startDate: formState.startDate,
      endDate: formState.endDate,
      days: dayCount,
      reason: formState.reason.trim() || "Leave requested via self-service portal.",
      status: "Pending",
      appliedOn: new Date().toISOString().slice(0, 10),
    };

    setRequests((current) => [newRequest, ...current]);
    resetForm();
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Leave Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Review leave requests, take action, and capture new applications from employees.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Requests" description="All time">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{requests.length}</p>
        </Card>
        <Card title="Pending Approval" description="Awaiting review">
          <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{pendingCount}</p>
        </Card>
        <Card title="Approved" description="Greenlit leaves">
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{approvedCount}</p>
        </Card>
        <Card title="Rejected" description="Declined applications">
          <p className="text-2xl font-semibold text-red-600 dark:text-red-400">{rejectedCount}</p>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:grid-cols-[2fr_1fr]">
            <Input
              label="Search"
              placeholder="Search by employee name or ID"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium text-gray-700 dark:text-gray-200">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as LeaveStatus | "")}
                className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900/40">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                    Employee
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                    Leave Period
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                    Days
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700 dark:divide-gray-800 dark:text-gray-300">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-900/40">
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-gray-100">{request.employeeName}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{request.employeeId}</span>
                          <span className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-300">
                            {request.department}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {new Date(request.startDate).toLocaleDateString()} – {new Date(request.endDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Applied {new Date(request.appliedOn).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{request.reason}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{request.type}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">{request.days}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClasses[request.status]}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(request.id, "Approved")}
                            className="rounded-md border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-500/40 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(request.id, "Rejected")}
                            className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-500/40 dark:text-red-300 dark:hover:bg-red-500/10"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                      No leave requests match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-4">
          <Card title="Apply for Leave" description="Employees can submit their leave plan for review">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-700 dark:text-gray-200">Employee</span>
                <select
                  value={formState.employeeId}
                  onChange={(event) => setFormState((state) => ({ ...state, employeeId: event.target.value }))}
                  className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="" disabled>
                    Select employee
                  </option>
                  {employeesDemoData.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} ({employee.id})
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-700 dark:text-gray-200">Leave Type</span>
                <select
                  value={formState.leaveType}
                  onChange={(event) => setFormState((state) => ({ ...state, leaveType: event.target.value as LeaveType }))}
                  className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                >
                  {LEAVE_TYPES.map((leaveType) => (
                    <option key={leaveType} value={leaveType}>
                      {leaveType}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Start Date"
                  type="date"
                  value={formState.startDate}
                  onChange={(event) => setFormState((state) => ({ ...state, startDate: event.target.value }))}
                  required
                />
                <Input
                  label="End Date"
                  type="date"
                  value={formState.endDate}
                  onChange={(event) => setFormState((state) => ({ ...state, endDate: event.target.value }))}
                  required
                />
              </div>

              <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-700 dark:text-gray-200">Reason</span>
                <textarea
                  rows={4}
                  value={formState.reason}
                  onChange={(event) => setFormState((state) => ({ ...state, reason: event.target.value }))}
                  placeholder="Mention the purpose and any supporting details"
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </label>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Reset
                </button>
                <Button type="submit">Submit Application</Button>
              </div>
            </form>
          </Card>
        </aside>
      </section>
    </section>
  );
}
