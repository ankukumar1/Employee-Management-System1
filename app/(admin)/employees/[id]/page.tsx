interface EmployeePageProps {
  params: { id: string };
}

export default function EmployeeDetailPage({ params }: EmployeePageProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Employee Details</h1>
      <p className="text-sm text-neutral-500">
        Placeholder details for employee with ID: <span className="font-mono">{params.id}</span>.
      </p>
    </section>
  );
}
