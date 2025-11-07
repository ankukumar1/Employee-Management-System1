"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { departmentOptions, employeesDemoData } from "@/demo-data/employees";
import { EllipsisVertical } from "lucide-react";

type SalaryStatus = "Paid" | "Pending" | "Processing";

type SalaryRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  role: string;
  month: string;
  amount: number;
  status: SalaryStatus;
  paymentDate?: string;
  remarks?: string;
};

type SalaryFormState = {
  employeeId: string;
  department: string;
  month: string;
  amount: string;
  status: SalaryStatus;
  paymentDate: string;
  remarks: string;
};

const MONTH_OPTIONS = ["October 2025", "September 2025", "August 2025"];

const MONTH_METADATA: Record<string, { payoutDate: string }> = {
  "October 2025": { payoutDate: "2025-10-30" },
  "September 2025": { payoutDate: "2025-09-30" },
  "August 2025": { payoutDate: "2025-08-30" },
};

const STATUS_COLOR: Record<SalaryStatus, string> = {
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  Pending: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300",
  Processing: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
};

const headers = ["Employee", "Department", "Amount", "Status", "Payment Date", "Remarks", "Action"];

const BASE_SALARY_BY_ROLE: Record<string, number> = {
  "HR Manager": 78000,
  "Software Engineer": 92000,
  "Product Designer": 86000,
  "QA Analyst": 66000,
  "Operations Lead": 88000,
};

const BASE_SALARY_BY_DEPARTMENT: Record<string, number> = {
  "Human Resources": 78000,
  Engineering: 92000,
  Product: 86000,
  "Quality Assurance": 70000,
  Operations: 88000,
};

const ACTION_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800";
const ACTION_DANGER_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-md border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-500/50 dark:text-red-300 dark:hover:bg-red-500/10";

const ACTION_SECONDARY_PILL_CLASS =
  "inline-flex items-center justify-center rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800";
const ACTION_PRIMARY_PILL_CLASS =
  "inline-flex items-center justify-center rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400";

function generateSalaryRecords(): SalaryRecord[] {
  const monthlyStatusPattern: SalaryStatus[][] = [
    ["Paid", "Paid", "Pending", "Processing", "Paid"],
    ["Paid", "Paid", "Paid", "Paid", "Paid"],
    ["Paid", "Paid", "Paid", "Paid", "Paid"],
  ];

  return MONTH_OPTIONS.flatMap((month, monthIndex) =>
    employeesDemoData.map((employee, employeeIndex) => {
      const status = monthlyStatusPattern[monthIndex]?.[employeeIndex] ?? "Paid";
      const amount = BASE_SALARY_BY_ROLE[employee.role] ?? 75000;

      return {
        id: `${employee.id}-${month}`,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        role: employee.role,
        month,
        amount,
        status,
        paymentDate: status === "Paid" ? MONTH_METADATA[month].payoutDate : undefined,
        remarks:
          status === "Pending"
            ? "Awaiting employee bank confirmation"
            : status === "Processing"
            ? "Scheduled for nightly payroll run"
            : undefined,
      } satisfies SalaryRecord;
    }),
  );
}

export default function SalaryPage() {
  const [records, setRecords] = useState<SalaryRecord[]>(() => generateSalaryRecords());
  const [selectedMonth, setSelectedMonth] = useState(MONTH_OPTIONS[0]);
  const [statusFilter, setStatusFilter] = useState<SalaryStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [recordBeingEdited, setRecordBeingEdited] = useState<SalaryRecord | null>(null);
  const [formState, setFormState] = useState<SalaryFormState>({
    employeeId: "",
    department: "",
    month: MONTH_OPTIONS[0],
    amount: "",
    status: "Pending",
    paymentDate: "",
    remarks: "",
  });
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const employeeOptions = useMemo(
    () =>
      employeesDemoData.map((employee) => ({
        id: employee.id,
        label: `${employee.name} (${employee.id})`,
      })),
    [],
  );

  const getBaseSalaryForEmployee = (employeeId: string) => {
    const employee = employeesDemoData.find((item) => item.id === employeeId);
    if (!employee) return 0;
    return (
      BASE_SALARY_BY_DEPARTMENT[employee.department] ?? BASE_SALARY_BY_ROLE[employee.role] ?? 75000
    );
  };

  const getBaseSalaryForDepartment = (department: string) =>
    BASE_SALARY_BY_DEPARTMENT[department] ?? 75000;

  const filteredRecords = records.filter((record) => {
    const matchesMonth = record.month === selectedMonth;
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesSearch = searchTerm
      ? `${record.employeeName} ${record.employeeId} ${record.department}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    return matchesMonth && matchesStatus && matchesSearch;
  });

  const totalInMonth = records.filter((record) => record.month === selectedMonth);
  const paidCount = filteredRecords.filter((record) => record.status === "Paid").length;
  const pendingCount = filteredRecords.filter((record) => record.status === "Pending").length;
  const processingCount = filteredRecords.filter((record) => record.status === "Processing").length;
  const totalAmount = totalInMonth.reduce((sum, record) => sum + record.amount, 0);
  const pendingAmount = filteredRecords
    .filter((record) => record.status !== "Paid")
    .reduce((sum, record) => sum + record.amount, 0);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("[data-salary-action-menu]")) {
        return;
      }
      setActionMenuOpenId(null);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleMarkPaid = (recordId: string, employeeName: string) => {
    setRecords((current) =>
      current.map((record) =>
        record.id === recordId
          ? {
              ...record,
              status: "Paid",
              paymentDate: new Date().toISOString().slice(0, 10),
              remarks: undefined,
            }
          : record,
      ),
    );

    alert(`Marked ${employeeName}'s salary as paid.`);
  };

  const openCreateModal = () => {
    const defaultEmployeeId = employeeOptions[0]?.id ?? "";
    const defaultEmployee = defaultEmployeeId
      ? employeesDemoData.find((employee) => employee.id === defaultEmployeeId)
      : undefined;
    const defaultDepartment = defaultEmployee?.department ?? departmentOptions[0] ?? "";
    const defaultAmount = defaultDepartment ? String(getBaseSalaryForDepartment(defaultDepartment)) : "";

    setFormState({
      employeeId: defaultEmployeeId,
      department: defaultDepartment,
      month: selectedMonth,
      amount: defaultAmount,
      status: "Pending",
      paymentDate: "",
      remarks: "",
    });
    setRecordBeingEdited(null);
    setModalOpen(true);
  };

  const openEditModal = (record: SalaryRecord) => {
    setRecordBeingEdited(record);
    setFormState({
      employeeId: record.employeeId,
      department: record.department,
      month: record.month,
      amount: record.amount.toString(),
      status: record.status,
      paymentDate: record.paymentDate ?? "",
      remarks: record.remarks ?? "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setRecordBeingEdited(null);
  };

  const handleDelete = (record: SalaryRecord) => {
    const confirmed = window.confirm(
      `Delete salary record for ${record.employeeName} (${record.month})? This action cannot be undone.`,
    );
    if (!confirmed) return;
    setRecords((current) => current.filter((item) => item.id !== record.id));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.employeeId) {
      alert("Please select an employee.");
      return;
    }

    const employee = employeesDemoData.find((item) => item.id === formState.employeeId);
    if (!employee) {
      alert("Selected employee no longer exists in the demo data.");
      return;
    }

    const department = formState.department || employee.department;

    const parsedAmount = Number.parseFloat(formState.amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Salary amount must be a positive number.");
      return;
    }

    let paymentDate = formState.paymentDate.trim();
    if (formState.status === "Paid" && !paymentDate) {
      paymentDate = new Date().toISOString().slice(0, 10);
    }
    if (formState.status !== "Paid") {
      paymentDate = paymentDate ? paymentDate : "";
    }

    const remarks = formState.remarks.trim();

    if (recordBeingEdited) {
      setRecords((current) =>
        current.map((record) =>
          record.id === recordBeingEdited.id
            ? {
                ...record,
                employeeId: employee.id,
                employeeName: employee.name,
                department,
                role: employee.role,
                month: formState.month,
                amount: parsedAmount,
                status: formState.status,
                paymentDate: paymentDate || undefined,
                remarks: remarks || undefined,
              }
            : record,
        ),
      );
      setSelectedMonth(formState.month);
    } else {
      const newRecord: SalaryRecord = {
        id: `salary-${crypto.randomUUID()}`,
        employeeId: employee.id,
        employeeName: employee.name,
        department,
        role: employee.role,
        month: formState.month,
        amount: parsedAmount,
        status: formState.status,
        paymentDate: paymentDate || undefined,
        remarks: remarks || undefined,
      };
      setRecords((current) => [newRecord, ...current]);
      setSelectedMonth(formState.month);
    }

    closeModal();
  };

  const modalTitle = recordBeingEdited ? "Edit Salary Record" : "Add Salary Record";

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Payroll Status</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review monthly payouts, track pending salaries, and follow up on exceptions.
          </p>
        </div>
        <Button type="button" onClick={openCreateModal}>
          Add Salary Record
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Payroll Total" description={selectedMonth}>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{currencyFormatter.format(totalAmount)}</p>
        </Card>
        <Card title="Employees Paid" description="Included in the current filters">
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{paidCount}</p>
        </Card>
        <Card title="Pending Salaries" description="Awaiting disbursement">
          <p className="text-2xl font-semibold text-red-600 dark:text-red-400">{pendingCount}</p>
        </Card>
        <Card title="Processing" description="Queued in payroll run">
          <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{processingCount}</p>
        </Card>
      </section>

      <section className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
        <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-700 dark:text-gray-200">Month</span>
          <select
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            {MONTH_OPTIONS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-700 dark:text-gray-200">Status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as SalaryStatus | "all")}
            className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="all">All statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
          </select>
        </label>

        <Input
          label="Search"
          placeholder="Search by employee or department"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="sm:col-span-2 lg:col-span-3 mt-2 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span>
            Showing {filteredRecords.length} of {totalInMonth.length} employees for {selectedMonth}
          </span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="px-3 py-1 text-xs"
              onClick={() => {
                setStatusFilter("all");
                setSearchTerm("");
              }}
            >
              Reset Filters
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="px-3 py-1 text-xs"
              onClick={() => alert("Export to CSV coming soon")}
            >
              Export CSV
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="px-3 py-1 text-xs"
              onClick={openCreateModal}
            >
              Add Salary Record
            </Button>
          </div>
        </div>
      </section>

      <Table headers={headers}>
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <tr
              key={record.id}
              className="text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900/40"
            >
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{record.employeeName}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{record.employeeId}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{record.department}</div>
                <div className="text-[13px] text-gray-600 dark:text-gray-300">{record.role}</div>
              </td>
              <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                {currencyFormatter.format(record.amount)}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLOR[record.status]}`}>
                  {record.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : "—"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {record.remarks ?? "—"}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex flex-nowrap items-center justify-end gap-1.5">
                  {record.status !== "Paid" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => alert(`Reminder sent to ${record.employeeName}`)}
                        className={ACTION_SECONDARY_PILL_CLASS}
                      >
                        Reminder
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleMarkPaid(record.id, record.employeeName);
                          setActionMenuOpenId(null);
                        }}
                        className={ACTION_PRIMARY_PILL_CLASS}
                      >
                        Mark Paid
                      </button>
                    </>
                  ) : (
                    <span className="self-center rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      Recorded
                    </span>
                  )}
                  <div className="relative" data-salary-action-menu>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActionMenuOpenId((current) => (current === record.id ? null : record.id));
                      }}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                      aria-haspopup="menu"
                      aria-expanded={actionMenuOpenId === record.id}
                      aria-label={`Actions for ${record.employeeName}`}
                    >
                      <EllipsisVertical size={16} />
                    </button>
                    {actionMenuOpenId === record.id ? (
                      <div className="absolute right-0 z-20 mt-2 w-40 rounded-md border border-gray-200 bg-white p-1 text-sm shadow-lg dark:border-gray-700 dark:bg-gray-900">
                        <button
                          type="button"
                          onClick={() => {
                            openEditModal(record);
                            setActionMenuOpenId(null);
                          }}
                          className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          Edit record
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(record);
                            setActionMenuOpenId(null);
                          }}
                          className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
                        >
                          Delete record
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
              No salary records match the current filters.
            </td>
          </tr>
        )}
      </Table>

      <section className="rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Pending Amount</h2>
        <p className="mt-1 text-2xl font-semibold text-red-600 dark:text-red-400">
          {currencyFormatter.format(pendingAmount)}
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Includes salaries still awaiting disbursement for the selected filters. Follow up with finance or
          the employees to resolve pending payouts.
        </p>
      </section>

      <Modal title={modalTitle} isOpen={isModalOpen} onClose={closeModal}>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Employee</span>
            <select
              value={formState.employeeId}
              onChange={(event) => {
                const value = event.target.value;
                const baseAmount = getBaseSalaryForEmployee(value);
                const employee = employeesDemoData.find((item) => item.id === value);
                const department = employee?.department ?? formState.department;
                setFormState((state) => ({
                  ...state,
                  employeeId: value,
                  department: department ?? "",
                  amount: baseAmount > 0 ? String(baseAmount) : state.amount,
                }));
              }}
              className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              required
            >
              <option value="">Select employee</option>
              {employeeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Department</span>
            <select
              value={formState.department}
              onChange={(event) => {
                const department = event.target.value;
                const baseAmount = getBaseSalaryForDepartment(department);
                setFormState((state) => ({
                  ...state,
                  department,
                  amount: baseAmount > 0 ? String(baseAmount) : state.amount,
                }));
              }}
              className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              required
            >
              <option value="">Select department</option>
              {departmentOptions.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Month</span>
            <select
              value={formState.month}
              onChange={(event) => setFormState((state) => ({ ...state, month: event.target.value }))}
              className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              required
            >
              {MONTH_OPTIONS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </label>

          <Input
            label="Salary Amount (INR)"
            name="salaryAmount"
            type="number"
            min={0}
            step={1000}
            value={formState.amount}
            onChange={(event) => setFormState((state) => ({ ...state, amount: event.target.value }))}
            required
          />

          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Status</span>
            <select
              value={formState.status}
              onChange={(event) =>
                setFormState((state) => ({ ...state, status: event.target.value as SalaryStatus }))
              }
              className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              required
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
            </select>
          </label>

          <Input
            label="Payment Date"
            name="paymentDate"
            type="date"
            value={formState.paymentDate}
            onChange={(event) => setFormState((state) => ({ ...state, paymentDate: event.target.value }))}
            description="Required if status is Paid; defaults to today when left blank."
          />

          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Remarks</span>
            <textarea
              rows={3}
              value={formState.remarks}
              onChange={(event) => setFormState((state) => ({ ...state, remarks: event.target.value }))}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Optional notes for payroll follow-up"
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <Button type="submit">
              {recordBeingEdited ? "Save Changes" : "Add Record"}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
