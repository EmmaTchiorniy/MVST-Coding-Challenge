import React from "react";

interface FilterControlsProps {
  nameFilter: string;
  langValues: string[];
  languages: string[];
  onNameFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLanguageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleDropdown: () => void;
  onClearFilters: () => void;
  dropdownVisible: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

function FilterControls({
  nameFilter,
  langValues,
  languages,
  onNameFilterChange,
  onLanguageChange,
  onToggleDropdown,
  onClearFilters,
  dropdownVisible,
  dropdownRef,
}: FilterControlsProps) {
  return (
    <div className="controls-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Filter by name..."
        value={nameFilter}
        onChange={onNameFilterChange}
      />
      <button className="clear-filters-button" onClick={onClearFilters}>
        Clear All Filters
      </button>
    </div>
  );
}

export default FilterControls;
