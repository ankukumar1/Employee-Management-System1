export interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "On Leave" | "Probation";
  joinDate: string;
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
