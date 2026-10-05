import React from 'react';
import { RotateCcw } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Health',
  'Fitness',
  'Study',
  'Wellness',
  'Productivity',
  'Personal'
];

const STATUSES = [
  { id: 'all', label: 'All' },
  { id: 'completed', label: 'Completed Today' },
  { id: 'pending', label: 'Pending Today' }
];

const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
  onClearFilters,
  isFiltered
}) => {
  return (
    <div className="filter-row">
      {/* Category Pills */}
      <div className="filter-pills-group">
        <span className="filter-label">Category:</span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Status Pills & Clear Filters */}
      <div className="filter-pills-group" style={{ marginLeft: 'auto' }}>
        <span className="filter-label">Status:</span>
        {STATUSES.map((status) => {
          const isActive = selectedStatus === status.id;
          return (
            <button
              key={status.id}
              type="button"
              className={`filter-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectStatus(status.id)}
            >
              {status.label}
            </button>
          );
        })}

        {isFiltered && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onClearFilters}
            style={{ marginLeft: '0.5rem' }}
          >
            <RotateCcw size={14} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
