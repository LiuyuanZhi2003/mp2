import React from 'react';

interface Props {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  defaultOpen?: boolean;
}

const FilterChips: React.FC<Props> = ({ title, options, selected, onToggle, defaultOpen = false }) => (
  <details open={defaultOpen}>
    <summary>Filter by {title}</summary>
    <div className="chips">
      {options.map((opt) => (
        <button
          key={opt}
          className={selected.includes(opt) ? 'chip active' : 'chip'}
          onClick={() => onToggle(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  </details>
);

export default FilterChips;