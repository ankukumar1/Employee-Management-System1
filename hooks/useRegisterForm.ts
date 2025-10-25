"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

const roleValues = ["admin", "hr_manager", "super_admin"] as const;

export const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "hr_manager", label: "HR Manager" },
  { value: "super_admin", label: "Super Admin" },
];

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(roleValues),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setStatusMessage(null);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: replace with a call to the real admin registration endpoint
    setStatusMessage("Registration successful! Redirecting you to the dashboard...");
    form.reset({ name: values.name, email: values.email, password: "", role: values.role });
    login();

    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  });

  return {
    form,
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    statusMessage,
    showPassword,
    togglePasswordVisibility,
    onSubmit,
  };
}
