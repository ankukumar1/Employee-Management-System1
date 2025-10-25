"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function LoginPage() {
  const {
    register,
    errors,
    isSubmitting,
    onSubmit,
    showPassword,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100 py-12 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-opacity='0.12' fill-rule='evenodd'%3E%3Cpath d='M0 80a80 80 0 1 1 160 0A80 80 0 0 1 0 80zm16 0a64 64 0 1 0 128 0A64 64 0 0 0 16 0z' fill='%231976d2'/%3E%3C/g%3E%3C/svg%3E')] bg-center opacity-50" />
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-gray-200 bg-white/90 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 sm:p-12">
            <div className="mb-10 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                Welcome Back
              </p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Sign in to your EMS dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Manage employees, track attendance, and stay on top of organizational updates.
              </p>
            </div>

            <form className="space-y-6" noValidate onSubmit={onSubmit}>
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                disabled={isSubmitting}
                error={errors.email?.message}
                {...register("email")}
              />
              <div className="space-y-2">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
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
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-300">
              Need an account? {" "}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Request admin access
              </Link>
            </p>
          </div>
          <div className="hidden flex-col justify-center gap-6 rounded-br-3xl rounded-tr-3xl border-l border-blue-100 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-8 text-white md:flex dark:border-gray-800">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Employee Management System</h2>
              <p className="text-sm text-blue-100">
                Streamline onboarding, automate attendance tracking, and keep your workforce informed with real-time
                notifications.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-blue-50">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">1</span>
                Secure access with role-based permissions
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">2</span>
                Insightful dashboards and analytics
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">3</span>
                Collaborative HR workflows
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
