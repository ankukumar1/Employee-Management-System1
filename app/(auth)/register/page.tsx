"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { roleOptions, useRegisterForm } from "@/hooks/useRegisterForm";

export default function RegisterPage() {
  const {
    register,
    errors,
    isSubmitting,
    statusMessage,
    showPassword,
    togglePasswordVisibility,
    onSubmit,
  } = useRegisterForm();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100 py-12 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml,%3Csvg width=\'220\' height=\'220\' viewBox=\'0 0 220 220\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 110a110 110 0 1 1 220 0A110 110 0 0 1 0 110zm20 0a90 90 0 1 0 180 0A90 90 0 0 0 20 0z\' fill=\'%231976d2\'/%3E%3C/g%3E%3C/svg%3E')] bg-center opacity-40" />
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/85">
        <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 sm:p-12">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                Create Admin Account
              </p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Set up your EMS administrator access
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Provide your details below to initialize the portal for your organization. You&apos;ll be able to invite team members once inside.
              </p>
            </div>

            <form className="mt-8 space-y-6" noValidate onSubmit={onSubmit}>
              <Input
                label="Full Name"
                placeholder="Jane Doe"
                autoComplete="name"
                disabled={isSubmitting}
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Email"
                type="email"
                placeholder="admin@company.com"
                autoComplete="email"
                disabled={isSubmitting}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                autoComplete="new-password"
                disabled={isSubmitting}
                error={errors.password?.message}
                endSlot={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="rounded-full p-1 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-800"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                }
                {...register("password")}
              />
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-200">Role</span>
                <select
                  className={`w-full rounded-md border border-neutral-200 px-3 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 ${
                    errors.role ? "border-red-500 focus:border-red-500 focus:ring-red-400" : ""
                  }`}
                  disabled={isSubmitting}
                  {...register("role")}
                >
                  {roleOptions.map((roleOption) => (
                    <option key={roleOption.value} value={roleOption.value}>
                      {roleOption.label}
                    </option>
                  ))}
                </select>
                {errors.role ? (
                  <span className="text-xs font-medium text-red-500">{errors.role.message}</span>
                ) : null}
              </label>

              <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create admin account"}
              </Button>

              {statusMessage ? (
                <p className="rounded-md border border-green-100 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-200">
                  {statusMessage}
                </p>
              ) : null}
            </form>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-300">
              Already have access? {" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Back to login
              </Link>
            </p>
          </div>
          <div className="hidden flex-col justify-center gap-6 border-l border-blue-100 bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 p-8 text-white md:flex dark:border-gray-800">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Why create an admin account?</h2>
              <p className="text-sm text-blue-100">
                Unlock access to workforce analytics, approvals, and secure employee data management from a single dashboard.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-blue-50">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">1</span>
                Configure organization settings and branding.
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">2</span>
                Invite HR teammates and assign roles securely.
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">3</span>
                Automate onboarding, attendance, and approvals.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
