"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { departmentOptions, roleOptions } from "@/demo-data/employees";

export default function EmployeeCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Add New Employee</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Upload a profile photo, capture personal details, and assign role & department.
        </p>
      </header>

      <form
        className="grid gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);
          await new Promise((resolve) => setTimeout(resolve, 800));
          setIsSubmitting(false);
          alert("Employee creation flow pending backend integration.");
        }}
      >
        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <Card title="Personal Details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full Name" name="name" placeholder="John Doe" required />
                <Input label="Email" name="email" type="email" placeholder="john.doe@example.com" required />
                <Input label="Phone Number" name="phone" type="tel" placeholder="+91 90000 00000" required />
                <Input label="Date of Birth" name="dob" type="date" required />
                <div className="sm:col-span-2">
                  <Input label="Address" name="address" placeholder="123, Residency Road, Bengaluru" />
                </div>
                <div className="sm:col-span-2">
                  <Input label="Emergency Contact" name="emergencyContact" placeholder="Contact name & phone" />
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
                    defaultValue=""
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
                    defaultValue=""
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
                <Input label="Join Date" name="joinDate" type="date" required />
                <Input label="Employee ID" name="employeeId" placeholder="EMP-1206" />
                <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Status</span>
                  <select
                    name="status"
                    className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <option>Active</option>
                    <option>Probation</option>
                    <option>On Leave</option>
                  </select>
                </label>
              </div>
            </Card>
          </div>

          <Card title="Profile Photo" description="Upload a square 512x512px image">
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-center text-sm text-gray-500 transition hover:border-blue-400 hover:text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <input type="file" name="photo" accept="image/*" className="hidden" />
              <span className="text-2xl">📷</span>
              <span className="max-w-[200px]">Click to upload or drag & drop to add a profile photo.</span>
            </label>
          </Card>
        </section>

        <Card title="Additional Notes">
          <textarea
            name="notes"
            rows={4}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            placeholder="Add onboarding notes, reporting manager, or asset assignments"
          />
        </Card>

        <footer className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is a demo form. Hook into your backend or server actions to persist employee records.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/employees"
              className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Employee"}
            </Button>
          </div>
        </footer>
      </form>
    </section>
  );
}
