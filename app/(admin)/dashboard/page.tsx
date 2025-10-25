import { Card } from "@/components/ui/Card";

const cards = [
  { title: "Total Employees", value: "128" },
  { title: "Departments", value: "8" },
  { title: "Attendance (Today)", value: "92%" },
  { title: "Leaves Pending", value: "3" },
];

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} title={card.title} value={card.value} />
      ))}
    </div>
  );
}
