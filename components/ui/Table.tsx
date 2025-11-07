import type { ReactNode } from "react";

type TableProps = {
  headers: string[];
  children: ReactNode;
};

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="rounded-xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full divide-y divide-neutral-200 dark:divide-neutral-800">
          <thead className="bg-neutral-50/80 backdrop-blur dark:bg-neutral-900/30">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600 transition-colors dark:text-neutral-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-800 dark:bg-neutral-950">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
