import type { PropsWithChildren, ReactNode } from "react";

type CardProps = PropsWithChildren<{
  title?: string;
  value?: ReactNode;
  className?: string;
}>;

export function Card({ title, value, className = "", children }: CardProps) {
  const hasContent = Boolean(children);

  return (
    <article
      className={`space-y-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {title ? <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h2> : null}
      {value ? (
        <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
      ) : null}
      {hasContent ? <div className="text-sm text-gray-600 dark:text-gray-300">{children}</div> : null}
    </article>
  );
}

export default Card;
