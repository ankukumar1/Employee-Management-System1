import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-neutral-600">
      {label ? <span className="font-medium text-neutral-700">{label}</span> : null}
      <input
        id={id}
        className={`rounded-md border border-neutral-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        {...props}
      />
    </label>
  );
}
