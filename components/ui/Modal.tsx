import { useId } from "react";
import type { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}>;

export default function Modal({ title, description, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  const titleId = useId();
  const descriptionId = description ? `${titleId}-description` : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-lg rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xl transition dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <h2 id={titleId} className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="text-sm text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:hover:bg-neutral-800"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
