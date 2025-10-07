import React from 'react';

export type SortKey = 'title' | 'date_start';

interface Props {
  sortKey: SortKey;
  sortDir: 'asc' | 'desc';
  onKey: (k: SortKey) => void;
  onToggleDir: () => void;
}

const ArrowUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path d="M12 4l-7 7h4v9h6v-9h4z" fill="currentColor"/>
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path d="M12 20l7-7h-4V4h-6v9H5z" fill="currentColor"/>
  </svg>
);

const SortControls: React.FC<Props> = ({ sortKey, sortDir, onKey, onToggleDir }) => (
  <div className="sortbar" role="group" aria-label="Sort controls">
    <span className="sortlabel">Sort by :</span>

    <label className="visually-hidden" htmlFor="sortkey">Sort by</label>
    <select id="sortkey" className="select" value={sortKey} onChange={(e) => onKey(e.target.value as SortKey)}>
      <option value="title">Title</option>
      <option value="date_start">Start Year</option>
    </select>

    <button
      type="button"
      className="toggle"
      onClick={onToggleDir}
      aria-label={sortDir === 'asc' ? 'Switch to descending order' : 'Switch to ascending order'}
      title={sortDir === 'asc' ? 'Descending' : 'Ascending'}
    >
      <span className="toggle-icon" aria-hidden>
        {sortDir === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </span>
      <span className="toggle-text">{sortDir === 'asc' ? 'ASC' : 'DESC'}</span>
    </button>
  </div>
);

export default SortControls;