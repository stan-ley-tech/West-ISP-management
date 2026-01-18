import React from 'react';

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select(props, ref) {
    return (
      <select
        ref={ref}
        className={`rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm ${props.className ?? ''}`}
        {...props}
      />
    );
  }
);
