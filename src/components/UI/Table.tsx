import React, { ReactNode } from 'react';

interface TableProps {
  headers: ReactNode[];
  children: ReactNode;
}

export const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <div className="overflow-x-auto border border-slate-800 rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900">
          <tr>
            {headers.map((h, idx) => (
              <th key={idx} className="px-3 py-2 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
