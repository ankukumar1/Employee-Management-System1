"use client";

import { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { employeesDemoData } from "@/demo-data/employees";

const PERMISSIONS = [
  "View",
  "Edit",
  "Delete",
  "Approve",
  "Export Reports",
  "Manage Users",
] as const;

type Permission = (typeof PERMISSIONS)[number];

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: Record<Permission, boolean>;
  assignedUsers: number;
};

type RoleFormState = {
  name: string;
  description: string;
  permissions: Record<Permission, boolean>;
};

function createPermissionMap(enabledPermissions: Permission[] = []): Record<Permission, boolean> {
  return PERMISSIONS.reduce<Record<Permission, boolean>>((accumulator, permission) => {
    accumulator[permission] = enabledPermissions.includes(permission);
    return accumulator;
  }, {} as Record<Permission, boolean>);
}

function createInitialRoles(): Role[] {
  const totalEmployees = employeesDemoData.length;

  return [
    {
      id: "role-admin",
      name: "Admin",
      description: "Full access across all modules including configuration and user management.",
      permissions: createPermissionMap([...PERMISSIONS]),
      assignedUsers: 2,
    },
    {
      id: "role-hr",
      name: "HR",
      description: "Handles onboarding, employee records, and approval workflows.",
      permissions: createPermissionMap(["View", "Edit", "Approve", "Export Reports"]),
      assignedUsers: 3,
    },
    {
      id: "role-employee",
      name: "Employee",
      description: "Standard access to self-service portals and personal records.",
      permissions: createPermissionMap(["View"]),
      assignedUsers: totalEmployees,
    },
  ];
}

function countEnabledPermissions(permissions: Record<Permission, boolean>) {
  return Object.values(permissions).filter(Boolean).length;
}

export default function RolesPage() {
  const initialRoles = useMemo(() => createInitialRoles(), []);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [roleBeingEdited, setRoleBeingEdited] = useState<Role | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState<RoleFormState>({
    name: "",
    description: "",
    permissions: createPermissionMap(["View"]),
  });

  const totalAssignments = roles.reduce((total, role) => total + role.assignedUsers, 0);
  const highPrivilegeRoles = roles.filter((role) => role.permissions["Manage Users"]).length;
  const averagePermissions = Math.round(
    roles.reduce((total, role) => total + countEnabledPermissions(role.permissions), 0) / Math.max(roles.length, 1),
  );

  const filteredRoles = roles.filter((role) => {
    if (!searchTerm) return true;
    const query = searchTerm.toLowerCase();
    return role.name.toLowerCase().includes(query) || role.description.toLowerCase().includes(query);
  });

  const openAddModal = () => {
    setRoleBeingEdited(null);
    setFormState({
      name: "",
      description: "",
      permissions: createPermissionMap(["View"]),
    });
    setModalOpen(true);
  };

  const openEditModal = (role: Role) => {
    setRoleBeingEdited(role);
    setFormState({
      name: role.name,
      description: role.description,
      permissions: { ...role.permissions },
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setRoleBeingEdited(null);
  };

  const handleTogglePermission = (roleId: string, permission: Permission, isEnabled: boolean) => {
    setRoles((current) =>
      current.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: { ...role.permissions, [permission]: isEnabled },
            }
          : role,
      ),
    );
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find((item) => item.id === roleId);
    if (!role) return;

    if (!window.confirm(`Delete the ${role.name} role? This action cannot be undone.`)) {
      return;
    }

    setRoles((current) => current.filter((item) => item.id !== roleId));
  };

  const updateFormPermission = (permission: Permission, isEnabled: boolean) => {
    setFormState((state) => ({
      ...state,
      permissions: {
        ...state.permissions,
        [permission]: isEnabled,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formState.name.trim();
    if (!trimmedName) {
      alert("Role name is required.");
      return;
    }

    if (roleBeingEdited) {
      setRoles((current) =>
        current.map((role) =>
          role.id === roleBeingEdited.id
            ? {
                ...role,
                name: trimmedName,
                description: formState.description.trim(),
                permissions: { ...formState.permissions },
              }
            : role,
        ),
      );
    } else {
      const newRole: Role = {
        id: crypto.randomUUID(),
        name: trimmedName,
        description: formState.description.trim(),
        permissions: { ...formState.permissions },
        assignedUsers: 0,
      };

      setRoles((current) => [newRole, ...current]);
    }

    closeModal();
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Role &amp; Permission Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure access levels, review assigned users, and adjust permissions across the platform.
          </p>
        </div>
        <Button type="button" onClick={openAddModal}>
          Add Role
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Active Roles" description="Configured profiles">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{roles.length}</p>
        </Card>
        <Card title="Total Assignments" description="Users mapped to roles">
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{totalAssignments}</p>
        </Card>
        <Card title="High-privilege Roles" description="Can manage users">
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{highPrivilegeRoles}</p>
        </Card>
        <Card title="Avg Permissions" description="Per role">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{averagePermissions}</p>
        </Card>
      </section>

      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Input
            label="Search roles"
            placeholder="Search by role name or description"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className="flex items-end justify-end">
            <Button type="button" onClick={() => setSearchTerm("")}>Clear Search</Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900/40">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                  Role
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                  Permissions
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                  Assigned Users
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700 dark:divide-gray-800 dark:text-gray-300">
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <tr key={role.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-900/40">
                    <td className="px-4 py-4 align-top">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{role.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{role.description || "No description added."}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {PERMISSIONS.map((permission) => {
                          const enabled = role.permissions[permission];
                          return (
                            <label
                              key={permission}
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${
                                enabled
                                  ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400/80 dark:bg-blue-500/10 dark:text-blue-200"
                                  : "border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={enabled}
                                onChange={(event) => handleTogglePermission(role.id, permission, event.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              {permission}
                            </label>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">{role.assignedUsers}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(role)}
                          className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRole(role.id)}
                          className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-500/40 dark:text-red-300 dark:hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    No roles match the current search. Adjust filters or create a new role.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Modal title={roleBeingEdited ? "Edit Role" : "Add Role"} isOpen={isModalOpen} onClose={closeModal}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Role Name"
            name="roleName"
            value={formState.name}
            onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))}
            placeholder="Eg. Finance Analyst"
            required
          />
          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Description</span>
            <textarea
              rows={3}
              value={formState.description}
              onChange={(event) => setFormState((state) => ({ ...state, description: event.target.value }))}
              placeholder="Summarize the responsibilities and access scope"
              className="rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-gray-700 dark:text-gray-200">Permissions</legend>
            <div className="flex flex-wrap gap-2">
              {PERMISSIONS.map((permission) => {
                const enabled = formState.permissions[permission];
                return (
                  <label
                    key={permission}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${
                      enabled
                        ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400/80 dark:bg-blue-500/10 dark:text-blue-200"
                        : "border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(event) => updateFormPermission(permission, event.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {permission}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <Button type="submit">{roleBeingEdited ? "Save Changes" : "Create Role"}</Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
