import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  description?: string;
  endSlot?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, description, endSlot, id, name, className = "", ...props }, ref) => {
    const inputId = id ?? name ?? undefined;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <label className="flex flex-col gap-1 text-sm">
        {label ? (
          <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>
        ) : null}
        <div className="relative flex items-center">
          <input
            id={inputId}
            name={name}
            ref={ref}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? errorId : description ? descriptionId : undefined}
            className={`w-full rounded-md border px-3 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 ${
              endSlot ? "pr-10" : "pr-3"
            } ${error ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-neutral-200"} ${className}`}
            {...props}
          />
          {endSlot ? (
            <span className="pointer-events-auto absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
              {endSlot}
            </span>
          ) : null}
        </div>
        {description ? (
          <span id={descriptionId} className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </span>
        ) : null}
        {error ? (
          <span id={errorId} className="text-xs font-medium text-red-500">
            {error}
          </span>
        ) : null}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
