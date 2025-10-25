"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";

export default function ForgotPasswordPage() {
  const { register, errors, isSubmitting, statusMessage, onSubmit } = useForgotPasswordForm();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100 py-12 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-opacity='0.12' fill-rule='evenodd'%3E%3Cpath d='M0 80a80 80 0 1 1 160 0A80 80 0 0 1 0 80zm16 0a64 64 0 1 0 128 0A64 64 0 0 0 16 0z' fill='%231976d2'/%3E%3C/g%3E%3C/svg%3E')] bg-center opacity-40" />
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white/90 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-12">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                Reset Password
              </p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Forgot your account password?
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Enter the email associated with your account and we&apos;ll send you a secure link to reset your password.
              </p>
            </div>

            <form className="mt-8 space-y-6" noValidate onSubmit={onSubmit}>
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                disabled={isSubmitting}
                error={errors.email?.message}
                {...register("email")}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? "Sending reset link..." : "Send reset link"}
              </Button>
              {statusMessage ? (
                <p className="rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-200">
                  {statusMessage}
                </p>
              ) : null}
            </form>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-300">
              Remembered your password? {" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Back to login
              </Link>
            </p>
          </div>
          <div className="hidden flex-col justify-center gap-6 border-l border-blue-100 bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 p-8 text-white md:flex dark:border-gray-800">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Security Matters</h2>
              <p className="text-sm text-blue-100">
                We take account security seriously. If you didn&apos;t request a password reset, you can safely ignore the
                email.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-blue-50">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">1</span>
                Check your inbox for the reset link.
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">2</span>
                Follow the link to create a new password.
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">3</span>
                Return to the portal and sign in securely.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
