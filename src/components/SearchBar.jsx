import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange, placeholder = 'Search habits...' }) => {
  return (
    <div className="search-input-wrap">
      <Search size={18} className="search-icon" aria-hidden="true" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search habits"
      />
      {searchQuery && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onSearchChange('')}
          aria-label="Clear search input"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
