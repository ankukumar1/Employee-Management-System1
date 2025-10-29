import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { employeeProfiles } from "@/demo-data/employees";
import type { EmployeeProfile } from "@/demo-data/employees";
import EditEmployeeForm from "./EditEmployeeForm";

interface EmployeeEditPageProps {
  params: { id: string };
}

export default function EmployeeEditPage({ params }: EmployeeEditPageProps) {
  const profile: EmployeeProfile | undefined = employeeProfiles[params.id];

  if (!profile) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-600">
          <Link href={`/employees/${profile.id}`} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-500">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <span>{profile.id}</span>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Edit {profile.name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Update core details, department, and status for this employee. Save to keep information in sync.
        </p>
      </header>

      <EditEmployeeForm profile={profile} />
    </section>
  );
}
