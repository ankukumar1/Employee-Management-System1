"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import { employeesDemoData } from "@/demo-data/employees";

type Department = {
  id: string;
  name: string;
  description: string;
  employeeCount: number;
};

type DepartmentFormState = {
  name: string;
  description: string;
  employeeCount: string;
};

const DEFAULT_DESCRIPTIONS: Record<string, string> = {
  "Human Resources": "Manages hiring, onboarding, and employee engagement programs.",
  Engineering: "Builds and maintains product features, infrastructure, and tooling.",
  Product: "Owns product strategy, discovery, and experience design.",
  "Quality Assurance": "Ensures release stability with manual and automated testing.",
  Operations: "Oversees cross-functional initiatives and vendor relationships.",
};

function createInitialDepartments(): Department[] {
  const counts = employeesDemoData.reduce<Record<string, number>>((accumulator, employee) => {
    accumulator[employee.department] = (accumulator[employee.department] ?? 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(counts).map(([name, count], index) => ({
    id: `dept-${index + 1}`,
    name,
    description: DEFAULT_DESCRIPTIONS[name] ?? "", 
    employeeCount: count,
  }));
}

export default function DepartmentsPage() {
  const initialDepartments = useMemo(() => createInitialDepartments(), []);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [departmentBeingEdited, setDepartmentBeingEdited] = useState<Department | null>(null);
  const [formState, setFormState] = useState<DepartmentFormState>({
    name: "",
    description: "",
    employeeCount: "0",
  });

  const departmentTotal = departments.reduce((total, department) => total + department.employeeCount, 0);

  const openAddModal = () => {
    setFormState({ name: "", description: "", employeeCount: "0" });
    setAddModalOpen(true);
  };

  const openEditModal = (department: Department) => {
    setDepartmentBeingEdited(department);
    setFormState({
      name: department.name,
      description: department.description,
      employeeCount: department.employeeCount.toString(),
    });
  };

  const closeModals = () => {
    setAddModalOpen(false);
    setDepartmentBeingEdited(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formState.name.trim();
    if (!trimmedName) {
      alert("Department name is required.");
      return;
    }

    const parsedCount = Number.parseInt(formState.employeeCount, 10);
    if (Number.isNaN(parsedCount) || parsedCount < 0) {
      alert("Employee count must be a non-negative number.");
      return;
    }

    if (departmentBeingEdited) {
      setDepartments((current) =>
        current.map((department) =>
          department.id === departmentBeingEdited.id
            ? { ...department, name: trimmedName, description: formState.description.trim(), employeeCount: parsedCount }
            : department,
        ),
      );
    } else {
      const newDepartment: Department = {
        id: crypto.randomUUID(),
        name: trimmedName,
        description: formState.description.trim(),
        employeeCount: parsedCount,
      };
      setDepartments((current) => [newDepartment, ...current]);
    }

    closeModals();
  };

  const handleDelete = (department: Department) => {
    const confirmed = window.confirm(`Delete ${department.name}? This action cannot be undone.`);
    if (!confirmed) return;

    setDepartments((current) => current.filter((item) => item.id !== department.id));
  };

  const renderModalTitle = departmentBeingEdited ? "Edit Department" : "Add Department";

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Department Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review departments, monitor headcount, and manage structural changes.
          </p>
        </div>
        <Button type="button" onClick={openAddModal}>
          Add Department
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Departments" description="Active functional units">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{departments.length}</p>
        </Card>
        <Card title="Total Employees" description="Across all departments">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{departmentTotal}</p>
        </Card>
      </section>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900/40">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Department
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Description
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                Employees
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700 dark:divide-gray-800 dark:text-gray-300">
            {departments.length > 0 ? (
              departments.map((department) => (
                <tr key={department.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-900/40">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{department.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {department.description || "No description provided."}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {department.employeeCount}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(department)}
                        className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(department)}
                        className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-500/50 dark:text-red-300 dark:hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                  No departments available. Add a department to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal title={renderModalTitle} isOpen={isAddModalOpen || Boolean(departmentBeingEdited)} onClose={closeModals}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Department Name"
            name="departmentName"
            value={formState.name}
            onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))}
            placeholder="Eg. Finance"
            required
          />
          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Description</span>
            <textarea
              name="departmentDescription"
              rows={3}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Briefly describe responsibilities and scope"
              value={formState.description}
              onChange={(event) => setFormState((state) => ({ ...state, description: event.target.value }))}
            />
          </label>
          <Input
            label="Employee Count"
            name="employeeCount"
            type="number"
            min={0}
            value={formState.employeeCount}
            onChange={(event) => setFormState((state) => ({ ...state, employeeCount: event.target.value }))}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModals}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <Button type="submit">{departmentBeingEdited ? "Save Changes" : "Add Department"}</Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
