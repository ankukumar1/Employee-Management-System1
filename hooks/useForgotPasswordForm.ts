"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function useForgotPasswordForm() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async () => {
    setStatusMessage(null);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: call backend reset endpoint and handle errors
    setStatusMessage(
      "We just sent you a secure reset link. Please check your email to continue."
    );
    form.reset();
  });

  return {
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    statusMessage,
    onSubmit,
  };
}
