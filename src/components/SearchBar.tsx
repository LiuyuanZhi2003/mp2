import React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="toolbar">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type to search artworks…"
        aria-label="Search"
      />
    </div>
  );
};

export default SearchBar;