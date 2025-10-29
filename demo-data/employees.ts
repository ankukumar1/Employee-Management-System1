export type EmploymentStatus = "Active" | "On Leave" | "Probation";

export interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: EmploymentStatus;
  joinDate: string;
}

export interface EmployeeAttendanceSummary {
  daysPresent: number;
  daysAbsent: number;
  lateCheckIns: number;
  lastUpdated: string;
}

export interface EmployeePerformanceStat {
  category: string;
  score: number;
  trend: "up" | "down" | "steady";
}

export interface EmployeeProfile extends EmployeeRecord {
  phone: string;
  dob: string;
  address: string;
  emergencyContact: string;
  attendanceSummary: EmployeeAttendanceSummary;
  recentAttendance: { date: string; status: EmploymentStatus }[];
  performance: EmployeePerformanceStat[];
  bio?: string;
}

export const employeesDemoData: EmployeeRecord[] = [
  {
    id: "EMP-001",
    name: "Anita Verma",
    email: "anita.verma@example.com",
    role: "HR Manager",
    department: "Human Resources",
    status: "Active",
    joinDate: "2022-03-15",
  },
  {
    id: "EMP-002",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "Active",
    joinDate: "2023-07-01",
  },
  {
    id: "EMP-003",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    role: "Product Designer",
    department: "Product",
    status: "On Leave",
    joinDate: "2021-11-22",
  },
  {
    id: "EMP-004",
    name: "Vikram Patel",
    email: "vikram.patel@example.com",
    role: "QA Analyst",
    department: "Quality Assurance",
    status: "Probation",
    joinDate: "2024-02-05",
  },
  {
    id: "EMP-005",
    name: "Meera Iyer",
    email: "meera.iyer@example.com",
    role: "Operations Lead",
    department: "Operations",
    status: "Active",
    joinDate: "2019-08-19",
  },
];

export const employeeProfiles: Record<string, EmployeeProfile> = {
  "EMP-001": {
    ...employeesDemoData[0],
    phone: "+91 98765 43210",
    dob: "1989-05-22",
    address: "Flat 204, Green Meadows, Mumbai",
    emergencyContact: "Ravi Verma (+91 98210 12345)",
    bio: "Seasoned HR professional leading the people strategy and employee engagement initiatives.",
    attendanceSummary: {
      daysPresent: 210,
      daysAbsent: 5,
      lateCheckIns: 8,
      lastUpdated: "2025-10-20",
    },
    recentAttendance: [
      { date: "2025-10-20", status: "Active" },
      { date: "2025-10-19", status: "Active" },
      { date: "2025-10-18", status: "Active" },
      { date: "2025-10-17", status: "On Leave" },
      { date: "2025-10-16", status: "Active" },
    ],
    performance: [
      { category: "People Engagement", score: 92, trend: "up" },
      { category: "Policy Compliance", score: 88, trend: "steady" },
      { category: "Hiring Velocity", score: 80, trend: "up" },
    ],
  },
  "EMP-002": {
    ...employeesDemoData[1],
    phone: "+91 99887 66554",
    dob: "1994-09-09",
    address: "Golden Residency, Pune",
    emergencyContact: "Sonia Sharma (+91 99333 22211)",
    bio: "Full-stack engineer focusing on product scalability and performance optimizations.",
    attendanceSummary: {
      daysPresent: 198,
      daysAbsent: 3,
      lateCheckIns: 4,
      lastUpdated: "2025-10-20",
    },
    recentAttendance: [
      { date: "2025-10-20", status: "Active" },
      { date: "2025-10-19", status: "Active" },
      { date: "2025-10-18", status: "Active" },
      { date: "2025-10-17", status: "Active" },
      { date: "2025-10-16", status: "Active" },
    ],
    performance: [
      { category: "Delivery", score: 95, trend: "up" },
      { category: "Code Quality", score: 89, trend: "steady" },
      { category: "Collaboration", score: 92, trend: "up" },
    ],
  },
  "EMP-003": {
    ...employeesDemoData[2],
    phone: "+91 90011 22334",
    dob: "1992-12-14",
    address: "Sunshine Apartments, Bengaluru",
    emergencyContact: "Karan Singh (+91 98888 77665)",
    bio: "Product designer crafting intuitive interfaces and user journeys for core modules.",
    attendanceSummary: {
      daysPresent: 160,
      daysAbsent: 12,
      lateCheckIns: 6,
      lastUpdated: "2025-10-20",
    },
    recentAttendance: [
      { date: "2025-10-20", status: "On Leave" },
      { date: "2025-10-19", status: "On Leave" },
      { date: "2025-10-18", status: "Active" },
      { date: "2025-10-17", status: "Active" },
      { date: "2025-10-16", status: "Active" },
    ],
    performance: [
      { category: "Design Quality", score: 91, trend: "up" },
      { category: "Research", score: 84, trend: "steady" },
      { category: "Collaboration", score: 88, trend: "up" },
    ],
  },
  "EMP-004": {
    ...employeesDemoData[3],
    phone: "+91 94455 66778",
    dob: "1996-07-30",
    address: "Lake View Residency, Hyderabad",
    emergencyContact: "Riya Patel (+91 95555 44332)",
    bio: "QA analyst ensuring release stability through automation coverage and regression testing.",
    attendanceSummary: {
      daysPresent: 60,
      daysAbsent: 2,
      lateCheckIns: 1,
      lastUpdated: "2025-10-20",
    },
    recentAttendance: [
      { date: "2025-10-20", status: "Active" },
      { date: "2025-10-19", status: "Active" },
      { date: "2025-10-18", status: "Active" },
      { date: "2025-10-17", status: "Active" },
      { date: "2025-10-16", status: "Active" },
    ],
    performance: [
      { category: "Test Coverage", score: 87, trend: "up" },
      { category: "Bug Detection", score: 82, trend: "steady" },
      { category: "Automation", score: 78, trend: "up" },
    ],
  },
  "EMP-005": {
    ...employeesDemoData[4],
    phone: "+91 91234 56780",
    dob: "1985-03-11",
    address: "Skyline Towers, Chennai",
    emergencyContact: "Kabir Iyer (+91 92222 33445)",
    bio: "Operations lead coordinating cross-functional projects and vendor relationships.",
    attendanceSummary: {
      daysPresent: 220,
      daysAbsent: 4,
      lateCheckIns: 3,
      lastUpdated: "2025-10-20",
    },
    recentAttendance: [
      { date: "2025-10-20", status: "Active" },
      { date: "2025-10-19", status: "Active" },
      { date: "2025-10-18", status: "Active" },
      { date: "2025-10-17", status: "Active" },
      { date: "2025-10-16", status: "Active" },
    ],
    performance: [
      { category: "Project Delivery", score: 90, trend: "up" },
      { category: "Stakeholder Management", score: 94, trend: "up" },
      { category: "Cost Efficiency", score: 88, trend: "steady" },
    ],
  },
};

export const departmentOptions = Array.from(
  new Set(employeesDemoData.map((employee) => employee.department))
).sort();

export const roleOptions = Array.from(new Set(employeesDemoData.map((employee) => employee.role))).sort();
