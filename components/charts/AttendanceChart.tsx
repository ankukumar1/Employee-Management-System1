const mockData = [
  { month: "Jan", percentage: 92 },
  { month: "Feb", percentage: 88 },
  { month: "Mar", percentage: 94 },
  { month: "Apr", percentage: 90 },
];

export default function AttendanceChart() {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Attendance</h2>
      <div className="mt-4 space-y-3">
        {mockData.map((item) => (
          <div key={item.month} className="space-y-1">
            <div className="flex items-center justify-between text-sm font-medium text-neutral-600">
              <span>{item.month}</span>
              <span>{item.percentage}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
