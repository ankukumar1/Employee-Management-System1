"use client";

import { useSyncExternalStore } from "react";

type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type EmployeeState = {
  employees: Employee[];
};

let state: EmployeeState = {
  employees: [],
};

const listeners = new Set<() => void>();

function setState(partial: Partial<EmployeeState>) {
  state = { ...state, ...partial };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

type EmployeeStore = EmployeeState & {
  addEmployee: (employee: Employee) => void;
  setEmployees: (employees: Employee[]) => void;
};

function getSnapshot(): EmployeeStore {
  return {
    ...state,
    addEmployee: (employee) => {
      setState({ employees: [...state.employees, employee] });
    },
    setEmployees: (employees) => {
      setState({ employees });
    },
  };
}

export function useEmployeeStore() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
