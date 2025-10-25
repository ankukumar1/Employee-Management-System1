export interface DashboardSummaryMetric {
  title: string;
  value: string;
  description: string;
  delta: string;
  iconBg: string;
}

export interface DashboardTrendPoint {
  label: string;
  value: number;
}

export const dashboardSummaryMetrics: DashboardSummaryMetric[] = [
  {
    title: "Total Employees",
    value: "128",
    description: "Active workforce",
    delta: "+12 new hires",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
  },
  {
    title: "Departments",
    value: "8",
    description: "Operational units",
    delta: "2 open positions",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  },
  {
    title: "Attendance Overview",
    value: "92%",
    description: "Today’s attendance",
    delta: "3 late check-ins",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  {
    title: "Upcoming Leaves",
    value: "5",
    description: "Next 7 days",
    delta: "Review approvals",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-300",
  },
];

export const monthlyHireTrend: DashboardTrendPoint[] = [
  { label: "Jan", value: 4 },
  { label: "Feb", value: 6 },
  { label: "Mar", value: 5 },
  { label: "Apr", value: 8 },
  { label: "May", value: 7 },
  { label: "Jun", value: 9 },
  { label: "Jul", value: 6 },
  { label: "Aug", value: 10 },
  { label: "Sep", value: 11 },
  { label: "Oct", value: 9 },
  { label: "Nov", value: 7 },
  { label: "Dec", value: 12 },
];

export const weeklyAttendanceTrend: DashboardTrendPoint[] = [
  { label: "Week 1", value: 91 },
  { label: "Week 2", value: 93 },
  { label: "Week 3", value: 89 },
  { label: "Week 4", value: 92 },
];
