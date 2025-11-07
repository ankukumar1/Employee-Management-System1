import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
  }
>;

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-300",
  secondary:
    "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-600",
};

export default function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
