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
      <div className="dropdown-container" ref={dropdownRef}>
        <button className="dropdown-button" onClick={onToggleDropdown}>
          {dropdownVisible ? "Hide Filters" : "Languages"}
        </button>
        <div className={`dropdown-list ${dropdownVisible ? "show" : ""}`}>
          {languages.map((language) => (
            <div key={language} className="dropdown-item">
              <input
                type="checkbox"
                id={language}
                value={language.toLowerCase()}
                checked={langValues.includes(language.toLowerCase())}
                onChange={onLanguageChange}
              />
              <label htmlFor={language}>{language}</label>
            </div>
          ))}
        </div>
      </div>
      <button className="clear-filters-button" onClick={onClearFilters}>
        Clear All Filters
      </button>
    </div>
  );
}

export default FilterControls;
