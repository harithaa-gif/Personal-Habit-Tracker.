import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import { isHabitCompletedToday } from '../utils/habitUtils';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import HabitCard from '../components/HabitCard';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';

const Habits = () => {
  const navigate = useNavigate();
  const { habits, toggleHabitCompletion, deleteHabit } = useHabits();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Delete modal state
  const [habitToDelete, setHabitToDelete] = useState(null);

  // Compute filtered habits using array filter and string matching
  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      // Search matching (Name or Category)
      const matchesSearch =
        searchQuery.trim() === '' ||
        habit.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        habit.category.toLowerCase().includes(searchQuery.toLowerCase().trim());

      // Category filter matching
      const matchesCategory =
        selectedCategory === 'All' || habit.category.toLowerCase() === selectedCategory.toLowerCase();

      // Status filter matching
      const isCompleted = isHabitCompletedToday(habit);
      let matchesStatus = true;
      if (selectedStatus === 'completed') {
        matchesStatus = isCompleted;
      } else if (selectedStatus === 'pending') {
        matchesStatus = !isCompleted;
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [habits, searchQuery, selectedCategory, selectedStatus]);

  // Is any filter active?
  const isFiltered =
    searchQuery.trim() !== '' || selectedCategory !== 'All' || selectedStatus !== 'all';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('all');
  };

  const handleDeleteConfirm = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete.id);
      setHabitToDelete(null);
    }
  };

  return (
    <div className="habits-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">My Habits</h1>
          <p className="page-subtitle">Manage and track the habits you want to build.</p>
        </div>
        <Link to="/add-habit" className="btn btn-primary">
          <PlusCircle size={18} />
          <span>+ Add New Habit</span>
        </Link>
      </div>

      {habits.length === 0 ? (
        <EmptyState
          title="No habits yet."
          subtext="Create your first habit and start building consistency."
          actionButtonText="Create Habit"
          onActionClick={() => navigate('/add-habit')}
        />
      ) : (
        <>
          {/* Search & Category / Status Filters */}
          <div className="filters-container">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Search habits by name or category..."
            />
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              onSelectStatus={setSelectedStatus}
              onClearFilters={handleClearFilters}
              isFiltered={isFiltered}
            />
          </div>

          {/* Habit Cards Grid or Filter Empty State */}
          {filteredHabits.length === 0 ? (
            <EmptyState
              variant="search"
              title="No matching habits found."
              subtext="Try adjusting your search query or clear the active category and status filters."
              actionButtonText="Clear Filters"
              onActionClick={handleClearFilters}
            />
          ) : (
            <div className="habits-grid">
              {filteredHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggleComplete={toggleHabitCompletion}
                  onDeleteRequest={setHabitToDelete}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(habitToDelete)}
        title="Delete Habit?"
        message={
          habitToDelete
            ? `Are you sure you want to delete "${habitToDelete.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this habit? This action cannot be undone.'
        }
        confirmText="Delete Habit"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setHabitToDelete(null)}
      />
    </div>
  );
};

export default Habits;
