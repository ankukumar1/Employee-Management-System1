"use client";

import { useState } from "react";
import Link from "next/link";
import type { EmploymentStatus, EmployeeProfile } from "@/demo-data/employees";
import { departmentOptions, roleOptions } from "@/demo-data/employees";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

interface EditEmployeeFormProps {
  profile: EmployeeProfile;
}

const statusOptions: EmploymentStatus[] = ["Active", "On Leave", "Probation"];

type FormState = {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: EmploymentStatus;
  joinDate: string;
  dob: string;
  address: string;
  emergencyContact: string;
  notes: string;
};

export default function EditEmployeeForm({ profile }: EditEmployeeFormProps) {
  const [formState, setFormState] = useState<FormState>(() => ({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    department: profile.department,
    role: profile.role,
    status: profile.status,
    joinDate: profile.joinDate,
    dob: profile.dob,
    address: profile.address,
    emergencyContact: profile.emergencyContact,
    notes: "",
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="grid gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
      onSubmit={async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsSubmitting(false);
        alert("Employee update flow pending backend integration.");
      }}
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card title="Personal Details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                name="name"
                value={formState.name}
                onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={(event) => setFormState((state) => ({ ...state, email: event.target.value }))}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={(event) => setFormState((state) => ({ ...state, phone: event.target.value }))}
                required
              />
              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={formState.dob}
                onChange={(event) => setFormState((state) => ({ ...state, dob: event.target.value }))}
                required
              />
              <div className="sm:col-span-2">
                <Input
                  label="Address"
                  name="address"
                  value={formState.address}
                  onChange={(event) => setFormState((state) => ({ ...state, address: event.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={formState.emergencyContact}
                  onChange={(event) =>
                    setFormState((state) => ({ ...state, emergencyContact: event.target.value }))
                  }
                  required
                />
              </div>
            </div>
          </Card>

          <Card title="Job Details">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-700 dark:text-gray-200">Department</span>
                <select
                  name="department"
                  className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                  value={formState.department}
                  onChange={(event) =>
                    setFormState((state) => ({ ...state, department: event.target.value }))
                  }
                  required
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  {departmentOptions.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-700 dark:text-gray-200">Role</span>
                <select
                  name="role"
                  className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                  value={formState.role}
                  onChange={(event) => setFormState((state) => ({ ...state, role: event.target.value }))}
                  required
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              <Input
                label="Join Date"
                name="joinDate"
                type="date"
                value={formState.joinDate}
                onChange={(event) => setFormState((state) => ({ ...state, joinDate: event.target.value }))}
                required
              />

              <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-700 dark:text-gray-200">Status</span>
                <select
                  name="status"
                  className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                  value={formState.status}
                  onChange={(event) =>
                    setFormState((state) => ({ ...state, status: event.target.value as EmploymentStatus }))
                  }
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </Card>
        </div>

        <Card title="Notes" description="Add onboarding reminders or action items">
          <textarea
            name="notes"
            rows={10}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            placeholder="Add notes for upcoming reviews, goals, or pending actions"
            value={formState.notes}
            onChange={(event) => setFormState((state) => ({ ...state, notes: event.target.value }))}
          />
        </Card>
      </section>

      <footer className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This is a demo form. Hook into your backend or server actions to persist employee updates.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={`/employees/${profile.id}`}
            className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </footer>
    </form>
  );
}
